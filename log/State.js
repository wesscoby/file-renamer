// State singleton

const { green, red, yellow } = require('chalk');

class State {
    constructor() {
        // Initialize properties
        this._filesInDirectory = 0;
        this._matchedFiles = 0;
        this._filesRenamed = 0;
        this._errors = {
            encountered: false,
            total: 0,
            messages: []
        }
    }

    // Property Getters and Setters
    get filesInDirectory() {
        return this._filesInDirectory;
    }

    set filesInDirectory(value) {
        this._filesInDirectory = value;
    }

    get matchedFiles() {
        return this._matchedFiles;
    }

    set matchedFiles(value) {
        this._matchedFiles = value;
    }

    get filesRenamed() {
        return this._filesRenamed;
    }

    set filesRenamed(value) {
        this._filesRenamed = value;
    }


    // Methods

    // Log Error
    logError(error) {
        if( !this._errors.encountered ) this._errors.encountered = true;
        this._errors.total++;
        if ( !this._errors.messages.includes(error.message) ) {
            this._errors.messages.push(error.message)
        }
    }

    // Display Errors
    displayErrors () {
    let { encountered, messages, total } = this._errors;
        if( encountered ) {
            return `${total} [ ${messages.join(",")} ]`
        } else {
            return total;
        }
    }

    // Display Log
    showLog() {
        return `
        Status: ${green("Completed")}
        Total Files: ${green(this.filesInDirectory)}
        Matched Files ${yellow("[To Be Renamed]:")} ${yellow(this.matchedFiles)}
        Files Renamed: ${green(this.filesRenamed)}
        Errors: ${red(this.displayErrors())}
        `;
    }
}

module.exports = new State();
