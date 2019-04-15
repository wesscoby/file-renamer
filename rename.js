const fs = require('fs');
const path = require('path');
const {log} = console; // Destructure the console object

const dir = path.join(__dirname, 'Files');      // Directory containing the files
const files = fs.readdirSync(dir);              // Files in the directory

// Patterns
const filePattern = RegExp(/^\[.+].+\.\w{3,}$/, 'i');
const authorPattern = RegExp(/^\[(.+)]/, 'i');
const bookNamePattern = RegExp(/^\[.+](.+)\(z-lib.org\)\.\w{3,}$/, 'i');
let _ = RegExp(/_/, 'g'); // To match underscores

// Keep Track of Success and Error counts
const state = {
    filesInDirectory: files.length,
    errors: {
      encountered: false,
      totalErrors: 0,
      errorMessages: new Map(),
    },
    successCount: 0,
    displayErrors: () => {
        if(state.errors.encountered) {
            let messages = state.errors.errorMessages.map((key, value) => value);
            return `${messages.join(",")}`
        } else {
            return state.errors.totalErrors;
        }
    }
};

// Error Log Handler
const handleError = error => {
    state.errors.encountered = true;
    state.errors.totalErrors++;
    state.errors.errorMessages.set(error.code, error.message)
};

// File Rename Handler
const handleFileRename = file => {
    try {
        // Extract Information
        let author = file.match(authorPattern)[1].replace(_, " ").trim();
        let book = file.match(bookNamePattern)[1].replace(_, " ").trim();
        let newName = `${book} - ${author}${path.extname(file)}`;

        // Assign Extracted Info
        const filePath = path.join(dir, file);
        const newFilePath = path.join(dir, newName);

        // Perform Rename
        fs.rename(filePath, newFilePath, error => {
            if(error) handleError(error)
        });
        if(!filePattern.test(newName)) state.successCount++;
    } catch(error) {
        handleError(error)
    }
};

files
    .filter(file => filePattern.test(file))
    .forEach(handleFileRename);

// Completion Information
log(`
    Status: Completed
    Total Files: ${state.filesInDirectory}
    Files Renamed: ${state.successCount}
    Errors: ${state.displayErrors()}}
`);
