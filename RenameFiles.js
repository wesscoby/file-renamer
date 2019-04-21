const path = require('path'),
    fs = require('fs'),
    State = require('./log/State');

class RenameFiles {
    constructor() {
        this._dir = path.join(__dirname, 'Files');         // Directory containing the files
        this._files = fs.readdirSync(this._dir);                // Files in the directory
        State.filesInDirectory = this._files.length;
        this._pattern = null;
        console.log(State.showInitialLog());
    }


    get files() {
        return this._files;
    }

    get dir() {
        return this._dir;
    }

    get pattern() {
        return this._pattern;
    }

    usePattern(patternClass) {
        this._pattern = patternClass;
    }

    shouldRename (file) {
        if ( this.pattern.filePattern.test(file) ) {
            State.matchedFiles++;
            return file;
        }
    }

    renameFile(file) {
        let newName = this.pattern.rename(file);
        // Assign Extracted Info
        const filePath = path.join(this.dir, file);
        const newFilePath = path.join(this.dir, newName);
        // Rename
        fs.rename(filePath, newFilePath, error => {
            if(error) {
                State.logError(error);
            }
        });
        // Increase counter for renamed files
        State.filesRenamed++;
    }

    // Rename Files
    exec(options = {}) {
        // Check if use patterns option was passed. Then use specified pattern
        if (options.usePattern) this.usePattern(options.usePattern);

        // Return a Promise
        return new Promise((resolve, reject) => {
            if( this.pattern === null ) {
                State.logError({ message: "Pattern NOT Defined" });
                reject( State.showCompletionLog() );
            } else {
                try {
                    this.files
                        .filter(file => this.shouldRename(file))
                        .forEach(file => this.renameFile(file));
                    resolve( State.showCompletionLog() );
                } catch (error) {
                    State.logError(error);
                    reject( State.showCompletionLog() );
                }
            }
        });
    }
}

module.exports = new RenameFiles();
