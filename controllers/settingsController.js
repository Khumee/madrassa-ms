const db = require('../db');

exports.showSignatureSettings = async (req, res) => {
    try {
        const tenantId = req.tenant.id;

        // Fetch fresh tenant record
        const [tenants] = await db.pool.execute('SELECT * FROM tenants WHERE id = ?', [tenantId]);
        const tenant = tenants[0] || req.tenant;

        // Fetch teachers list for dropdown / suggestions
        const [teachers] = await db.execute(
            'SELECT id, name FROM teachers WHERE tenant_id = ? ORDER BY name ASC',
            [tenantId]
        );

        // Fetch classes list with current nazim_saff_name
        const [classes] = await db.execute(
            'SELECT id, name, nazim_saff_name FROM classes WHERE tenant_id = ? ORDER BY id ASC',
            [tenantId]
        );

        res.render('settings_signatures', {
            tenant,
            teachers,
            classes,
            role: req.session.role,
            success: req.query.success === '1'
        });
    } catch (err) {
        console.error('Error showing signature settings:', err);
        res.status(500).send('Error loading settings');
    }
};

exports.updateSignatureSettings = async (req, res) => {
    try {
        const tenantId = req.tenant.id;
        const {
            mohtamim_name,
            nazim_taleemat_name,
            nazim_imtihanat_name,
            default_nazim_saff_name,
            class_nazim // object mapping classId => name, or array
        } = req.body;

        // 1. Update tenant global signatories
        await db.pool.execute(`
            UPDATE tenants 
            SET mohtamim_name = ?, 
                nazim_taleemat_name = ?, 
                nazim_imtihanat_name = ?, 
                default_nazim_saff_name = ?
            WHERE id = ?
        `, [
            (mohtamim_name || '').trim(),
            (nazim_taleemat_name || '').trim(),
            (nazim_imtihanat_name || '').trim(),
            (default_nazim_saff_name || '').trim(),
            tenantId
        ]);

        // 2. Update class-specific nazim_saff_name
        if (class_nazim && typeof class_nazim === 'object') {
            for (const [classId, nazimName] of Object.entries(class_nazim)) {
                await db.execute(
                    'UPDATE classes SET nazim_saff_name = ? WHERE id = ? AND tenant_id = ?',
                    [(nazimName || '').trim() || null, classId, tenantId]
                );
            }
        }

        res.redirect('/settings/signatures?success=1');
    } catch (err) {
        console.error('Error updating signature settings:', err);
        res.status(500).send('Error saving settings');
    }
};
