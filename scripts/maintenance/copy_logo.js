const fs = require('fs');
try {
    fs.copyFileSync('logo.jpg', 'public/logo.jpg');
    console.log('Logo copied successfully!');
} catch (err) {
    console.error('Failed to copy logo:', err);
}
