/**
 * Demo Guard Middleware
 * Prevents modifications to critical structural data (deletions, password resets, permissions changes)
 * on the public demo tenant ('madrassa-ms') to protect the shared playground for all visitors.
 */
const forbiddenEndpoints = [
    { method: 'POST', path: /^\/profile\/change-password/i },
    { method: 'POST', path: /^\/users\/update/i },
    { method: 'POST', path: /^\/users\/update-role/i },
    { method: 'POST', path: /^\/users\/reset-password/i },
    { method: 'POST', path: /^\/permissions\/toggle/i },
    { method: 'GET',  path: /^\/admin\/import-data/i },
    { method: 'GET',  path: /^\/students\/delete/i },
    { method: 'GET',  path: /^\/teachers\/delete/i },
    { method: 'POST', path: /^\/teacher-books\/delete/i },
    { method: 'POST', path: /^\/periods\/delete/i },
    { method: 'POST', path: /^\/periods\/generate-auto/i },
    { method: 'POST', path: /^\/books\/delete/i }
];

module.exports = (req, res, next) => {
    // Only apply guards to the public demo tenant
    if (req.tenant && req.tenant.subdomain === 'madrassa-ms') {
        const isForbidden = forbiddenEndpoints.some(rule => {
            return req.method === rule.method && rule.path.test(req.path);
        });

        if (isForbidden) {
            const message = req.__ ? req.__('Demo_Protection_Enabled') || 'This action is disabled in the public demo to preserve the sandbox.' : 'This action is disabled in the public demo to preserve the sandbox.';
            
            // Check if the request expects JSON response
            if (req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'))) {
                return res.status(403).json({ success: false, error: message });
            }
            
            // Otherwise, send a warning screen or alert
            return res.status(403).send(`
                <html>
                <head>
                    <title>Demo Protection</title>
                    <meta charset="utf-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body class="bg-light d-flex align-items-center justify-content-center" style="height: 100vh;">
                    <div class="card p-4 text-center shadow-lg" style="max-width: 450px; border-radius: 12px;">
                        <div class="text-warning mb-3">
                            <svg width="60" height="60" fill="currentColor" class="bi bi-shield-slash" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M1.093 3.093c-.465.465-.75 1.1-.75 1.833 0 2.21 2.593 5.485 5.093 7.828 2.5-2.343 5.093-5.618 5.093-7.828 0-.733-.285-1.368-.75-1.833L1.093 3.093zM8 0c-.69 0-1.32.2-1.85.53L1.53 5.15C1.2 5.68 1 6.31 1 7c0 3 4.5 8 7 10 2.5-2 7-7 7-10 0-.69-.2-1.32-.53-1.85L10.33.67C9.8.33 9.17 0 8 0z"/>
                            </svg>
                        </div>
                        <h4 class="fw-bold mb-2">حفاظتی موڈ فعال ہے / Demo Mode Guard</h4>
                        <p class="text-muted mb-4">${message}</p>
                        <button onclick="window.history.back()" class="btn btn-primary rounded-pill px-4">ٹھیک ہے / Back</button>
                    </div>
                </body>
                </html>
            `);
        }
    }
    next();
};
