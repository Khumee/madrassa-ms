const { execSync } = require('child_process');
const fs = require('fs');

try {
    const content = execSync('git show 91c7095:server.js').toString();
    const lines = content.split('\n');
    let insideRoute = false;
    let braceCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("app.get('/teachers'") || line.includes('app.get(\'/teachers\'')) {
            insideRoute = true;
            console.log(`Found starting at line ${i + 1}`);
        }
        if (insideRoute) {
            console.log(`${i + 1}: ${line}`);
            const openBraces = (line.match(/{/g) || []).length;
            const closeBraces = (line.match(/}/g) || []).length;
            braceCount += openBraces - closeBraces;
            if (line.includes('app.get') && i > 0 && braceCount === 0) {
                // Wait, only stop when braces balance back to 0
            }
            if (braceCount === 0 && line.trim() === '});') {
                insideRoute = false;
                console.log('--- END OF ROUTE ---');
            }
        }
    }
} catch (err) {
    console.error(err);
}
