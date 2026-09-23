const db = require('../db');

// Helper to safely ensure columns exist in case migration wasn't run on production yet
let columnsChecked = false;
async function ensureSignatureColumns() {
    if (columnsChecked) return;
    try {
        const [tenantCols] = await db.pool.execute('SHOW COLUMNS FROM tenants LIKE "mohtamim_name"');
        if (tenantCols.length === 0) {
            await db.pool.execute('ALTER TABLE tenants ADD COLUMN mohtamim_name VARCHAR(255) NULL DEFAULT ""');
            await db.pool.execute('ALTER TABLE tenants ADD COLUMN nazim_taleemat_name VARCHAR(255) NULL DEFAULT ""');
            await db.pool.execute('ALTER TABLE tenants ADD COLUMN nazim_imtihanat_name VARCHAR(255) NULL DEFAULT ""');
            await db.pool.execute('ALTER TABLE tenants ADD COLUMN default_nazim_saff_name VARCHAR(255) NULL DEFAULT ""');
        }
        const [classCols] = await db.pool.execute('SHOW COLUMNS FROM classes LIKE "nazim_saff_name"');
        if (classCols.length === 0) {
            await db.pool.execute('ALTER TABLE classes ADD COLUMN nazim_saff_name VARCHAR(255) NULL DEFAULT NULL');
        }
        columnsChecked = true;
    } catch (err) {
        console.warn('Signature columns check warning:', err.message);
    }
}

exports.showSignatureSettings = async (req, res) => {
    try {
        await ensureSignatureColumns();
        const tenantId = req.tenant.id;

        // Fetch fresh tenant record
        const [tenants] = await db.pool.execute('SELECT * FROM tenants WHERE id = ?', [tenantId]);
        const tenant = tenants[0] || req.tenant;

        // Fetch teachers list for dropdown / suggestions
        let teachers = [];
        try {
            const [teacherRows] = await db.execute(
                'SELECT * FROM teachers WHERE tenant_id = ? ORDER BY name ASC',
                [tenantId]
            );
            teachers = teacherRows;
        } catch (tErr) {
            console.warn('Error fetching teachers for signature settings:', tErr.message);
        }

        // Fetch classes list with current nazim_saff_name (using SELECT * to support both name and name_ar schemas)
        let classes = [];
        try {
            const [classRows] = await db.execute(
                'SELECT * FROM classes WHERE tenant_id = ? ORDER BY id ASC',
                [tenantId]
            );
            classes = classRows.map(c => ({
                id: c.id,
                name: c.name_ar || c.name || '',
                name_ar: c.name_ar || c.name || '',
                nazim_saff_name: c.nazim_saff_name || ''
            }));
        } catch (cErr) {
            console.warn('Error fetching classes for signature settings:', cErr.message);
        }

        res.render('settings_signatures', {
            tenant,
            teachers,
            classes,
            role: req.session.role,
            success: req.query.success === '1'
        });
    } catch (err) {
        console.error('Error showing signature settings:', err);
        res.status(500).send('Error loading settings: ' + err.message);
    }
};

exports.updateSignatureSettings = async (req, res) => {
    try {
        await ensureSignatureColumns();
        const tenantId = req.tenant.id;
        const {
            mohtamim_name,
            nazim_taleemat_name,
            nazim_imtihanat_name,
            default_nazim_saff_name,
            class_nazim // object mapping classId => name
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
        res.status(500).send('Error saving settings: ' + err.message);
    }
};
