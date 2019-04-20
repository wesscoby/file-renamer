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
        try {
            let newName = this.pattern.rename(file);

            // Assign Extracted Info
            const filePath = path.join(this.dir, file);
            const newFilePath = path.join(this.dir, newName);

            // Perform Rename
            fs.rename(filePath, newFilePath, error => {
                if(error) State.logError(error);
            });
            // If Rename Successful, increase Success Count in State
            if(!this.pattern.filePattern.test(newName)) State.filesRenamed++;
        } catch(error) {
            State.logError(error);
        }
    }

    exec(options = {}) {
        // Check if use patterns option was passed. Then use specified pattern
        if (options.usePattern) this.usePattern(options.usePattern);
        return new Promise((resolve, reject) => {
            if( this.pattern === null ) {
                State.logError({ message: "Pattern NOT Defined" });
                reject( State.showCompletionLog() );
            } else {
                this.files
                    .filter(file => this.shouldRename(file))
                    .forEach(file => this.renameFile(file));
                resolve(State.showCompletionLog());
            }
        });
    }
}

module.exports = new RenameFiles();
