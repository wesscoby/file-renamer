const path = require('path'),
    fs = require('fs'),
    State = require('./log/State');

const dir = path.join(__dirname, 'Files');      // Directory containing the files
const files = fs.readdirSync(dir);              // Files in the directory
State.filesInDirectory = files.length;          // Number of files in the directory

module.exports = {
    files,
    shouldRename: (file, pattern) => {
        if(pattern.filePattern.test(file)) {
            State.matchedFiles++;
            return file;
        }
    },
    renameFile: (file, pattern) => {
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
    }
};
