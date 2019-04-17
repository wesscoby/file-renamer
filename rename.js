const fs = require('fs');
const path = require('path');
const State = require('./log/State'); // State singleton
const { zLibraryBookPattern } = require('./patterns');
const { log } = console; // Destructure the console object

const dir = path.join(__dirname, 'Files');      // Directory containing the files
const files = fs.readdirSync(dir);              // Files in the directory
State.filesInDirectory = files.length;          // Number of files in the directory


// File Rename Handler
const handleFileRename = (file, pattern) => {
    try {
        let newName = pattern.rename(file);

        // Assign Extracted Info
        const filePath = path.join(dir, file);
        const newFilePath = path.join(dir, newName);

        // Perform Rename
        fs.rename(filePath, newFilePath, error => {
            if(error) State.logError(error);
        });
        // If Rename Successful, increase Success Count in State
        if(!pattern.filePattern.test(newName)) State.filesRenamed++;
    } catch(error) {
        State.logError(error);
    }
};

//
files
    .filter(file => {
        if(zLibraryBookPattern.filePattern.test(file)) {
            State.matchedFiles++;
            return file;
        }
    })
    .forEach(file => handleFileRename(file, zLibraryBookPattern));

// Completion Information
log( State.showLog() );
