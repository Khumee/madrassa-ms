const fs = require('fs');
const path = require('path');

const kuiSqlPath = path.join(__dirname, '..', 'sql', 'kui.sql');
const schemaPath = path.join(__dirname, '..', 'sql', 'V1__Schema.sql');
const dataPath = path.join(__dirname, '..', 'sql', 'V2__Data.sql');

if (!fs.existsSync(kuiSqlPath)) {
    console.error('kui.sql not found at ' + kuiSqlPath);
    process.exit(1);
}

const content = fs.readFileSync(kuiSqlPath, 'utf8');
const lines = content.split(/\r?\n/);

const header = [
    'SET NAMES utf8mb4;',
    'SET FOREIGN_KEY_CHECKS = 0;',
    ''
];

const footer = [
    '',
    'SET FOREIGN_KEY_CHECKS = 1;'
];

const schemaLines = [...header];
const dataLines = [...header];

let currentTableForData = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip the global header/footer in the raw file to avoid duplication
    if (trimmed.startsWith('SET NAMES') || trimmed.startsWith('SET FOREIGN_KEY_CHECKS')) {
        continue;
    }

    if (trimmed.startsWith('-- Records of')) {
        currentTableForData = trimmed.replace('-- Records of', '').trim().replace(/`/g, '');
        // Do not add the "schema_history" records to our V2 data
        if (currentTableForData === 'schema_history') {
            continue;
        }
        dataLines.push(line);
        continue;
    }

    if (trimmed.startsWith('INSERT INTO')) {
        // Skip inserts into schema_history table to avoid version tracking conflicts
        if (currentTableForData === 'schema_history' || trimmed.startsWith('INSERT INTO `schema_history`')) {
            continue;
        }
        dataLines.push(line);
        continue;
    }

    // Identify schema history table creation and drop statements
    if (trimmed.startsWith('DROP TABLE IF EXISTS `schema_history`')) {
        // Skip schema history table structure in migration to let migrate.js handle it
        while (i < lines.length && !lines[i].trim().endsWith(';')) {
            i++;
        }
        continue;
    }
    
    if (trimmed.startsWith('CREATE TABLE `schema_history`')) {
        while (i < lines.length && !lines[i].trim().endsWith(';')) {
            i++;
        }
        continue;
    }

    // Avoid pushing trailing empty lines or formatting comments that might get messy
    schemaLines.push(line);
}

schemaLines.push(...footer);
dataLines.push(...footer);

fs.writeFileSync(schemaPath, schemaLines.join('\n'), 'utf8');
fs.writeFileSync(dataPath, dataLines.join('\n'), 'utf8');

console.log('Successfully split kui.sql into:');
console.log('- V1__Schema.sql');
console.log('- V2__Data.sql');
