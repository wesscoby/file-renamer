const fs = require('fs');
const path = require('path');
const State = require('./log/State'); // State singleton
const { log } = console; // Destructure the console object

const dir = path.join(__dirname, 'Files');      // Directory containing the files
const files = fs.readdirSync(dir);              // Files in the directory

State.filesInDirectory = files.length;          // Number of files in the directory


// Patterns
const filePattern = RegExp(/^\[.+].+\.\w{3,}$/, 'i');
const authorPattern = RegExp(/^\[(.+)]/, 'i');
const bookNamePattern = RegExp(/^\[.+](.+)\(z-lib.org\)\.\w{3,}$/, 'i');
let _ = RegExp(/_/, 'g'); // To match underscores



// File Rename Handler
const handleFileRename = file => {
    try {
        // Extract Information
        let author = file.match(authorPattern)[1].replace(_, " ").trim();
        // Using an iife to check for number of authors and output the corresponding author naming format
        // If authors are four or more, author = 'first author et al'
        author = (() => {
            author = author.split(",");
            return (author.length >= 4) ? `${author[0]} et al` : author.join(",");
        })();
        let book = file.match(bookNamePattern)[1].replace(_, " ").trim();
        let newName = `${book} - ${author}${path.extname(file)}`;

        // Assign Extracted Info
        const filePath = path.join(dir, file);
        const newFilePath = path.join(dir, newName);

        // Perform Rename
        fs.rename(filePath, newFilePath, error => {
            if(error) State.logError(error);
        });
        if(!filePattern.test(newName)) State.filesRenamed++;
    } catch(error) {
        State.logError(error)
    }
};

files
    .filter(file => {
        if(filePattern.test(file)) {
            State.matchedFiles++;
            return file;
        }
    })
    .forEach(handleFileRename);

// Completion Information
log( State.showLog() );
