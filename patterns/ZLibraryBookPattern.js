const path = require('path');

class ZLibraryBookPattern {
    constructor() {
        // Patterns
        this.filePattern = RegExp(/^\[.+].+\.\w{3,}$/, 'i'); // Pattern to match for rename
        this.authorPattern = RegExp(/^\[(.+)]/, 'i');
        this.bookNamePattern = RegExp(/^\[.+](.+)\(z-lib.org\)\.\w{3,}$/, 'i');
        this._ = RegExp(/_/, 'g'); // To match underscores
    }

    rename(file) {
        // Extract Information
        let author = file.match(this.authorPattern)[1].replace(this._, " ").trim();
        // Using an iife to check for number of authors and output the corresponding author naming format
        // If authors are four or more, author = 'first author et al'
        author = (() => {
            author = author.split(",");
            return (author.length >= 4) ? `${author[0]} et al` : author.join(",");
        })();
        let book = file.match(this.bookNamePattern)[1].replace(this._, " ").trim();
        // Return new file name
        return `${book} - ${author}${path.extname(file)}`;
    }
}

module.exports = new ZLibraryBookPattern();
