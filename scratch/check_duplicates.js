const fs = require('fs');

function findDuplicateKeys(jsonString) {
    const keys = [];
    const duplicates = [];
    
    // We can use a custom parser or regex to capture all keys in the order they appear
    const keyRegex = /"([^"\\]|\\.)*"\s*:/g;
    let match;
    while ((match = keyRegex.exec(jsonString)) !== null) {
        const key = match[0].slice(1, -2); // strip quotes and colon
        if (keys.includes(key)) {
            duplicates.push(key);
        } else {
            keys.push(key);
        }
    }
    return duplicates;
}

const content = fs.readFileSync('locales/ur.json', 'utf8');
const dups = findDuplicateKeys(content);
console.log('ur.json duplicate keys:', dups);

const contentAr = fs.readFileSync('locales/ar.json', 'utf8');
const dupsAr = findDuplicateKeys(contentAr);
console.log('ar.json duplicate keys:', dupsAr);

