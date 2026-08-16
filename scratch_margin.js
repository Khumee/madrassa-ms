const fs = require('fs');
const path = require('path');

const viewsPath = path.join(__dirname, 'views', 'exams');
const files = fs.readdirSync(viewsPath).filter(f => f.endsWith('.ejs'));

for (const file of files) {
    const filePath = path.join(viewsPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace margin top 4 with margin top 1 to reduce spacing
    const newContent = content.replace(/class="container mt-4"/g, 'class="container mt-1"')
                              .replace(/class="container mt-4 mb-5"/g, 'class="container mt-1 mb-5"');
                              
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Updated ' + file);
    }
}
