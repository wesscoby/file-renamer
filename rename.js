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
    matchedFiles: 0,
    errors: {
      encountered: false,
      totalErrors: 0,
      errorMessages: [],
    },
    successCount: 0,
    displayErrors: () => {
        let { encountered, errorMessages, totalErrors } = state.errors;
        if(encountered) {
            return `${totalErrors} [ ${errorMessages.join(",")} ]`
        } else {
            return state.errors.totalErrors;
        }
    }
};

// Error Log Handler
const handleError = error => {
    state.errors.encountered = true;
    state.errors.totalErrors++;
    if(!state.errors.errorMessages.includes(error.message)) {
        state.errors.errorMessages.push(error.message)
    }
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
    .filter(file => {
        if(filePattern.test(file)) {
            state.matchedFiles++;
            return file;
        }
    })
    .forEach(handleFileRename);

// Completion Information
log(`
    Status: Completed
    Total Files: ${state.filesInDirectory}
    Matched Files [To Be Renamed]: ${state.matchedFiles}
    Files Renamed: ${state.successCount}
    Errors: ${state.displayErrors()}
`);
