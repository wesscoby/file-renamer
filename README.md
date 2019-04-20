## File Renamer
#### Rename Multiple Files in a Folder

This was inspired by, and is based on a gist by [Scriptex](https://gist.github.com/scriptex), [index.js](https://gist.github.com/scriptex/20536d8cda36221f91d69a6bd4a528b3).
I have modified it to suit my purpose. <br />
I have been downloading books from [Zlibrary](https://b-ok.cc/) and the downloaded files have a naming format:
##### \[Author\(s\)\]File_name\(z-lib.org\).extension
###### Eg. \[WessCoby\]_Rename_Multiple_Files_in_a_Folder(z-lib.org\).pdf

<img src="https://github.com/WessCoby/file-renamer/blob/master/images/files_bfr.png" width="95%" title="Files: Before">
<img src="https://github.com/WessCoby/file-renamer/blob/master/images/ide_bfr.png" width="95%" title="IDE: Before">

The Key things i want from this file name string are just the file name and authors(s)
And i want to rename each file to:
##### Filename - Author(s).extension
###### Eg. Rename Multiple Files in a Folder - WessCoby.pdf

##  Renaming Process

*   Use `filePattern` to filter for files that need to be renamed
*   Use `authorPattern` to extract Author name(s), and assign to the variable `author` and remove underscores
*   Use `bookNamePattern` to extract book name and assign to the variable `book` and remove underscores
*   Combine `book` and `author` and assign to `newName`. 
*   Format: `book - @author.extension`

<img src="https://github.com/WessCoby/file-renamer/blob/master/images/ide_aftr.png" width="95%" title="IDE: After">
<img src="https://github.com/WessCoby/file-renamer/blob/master/images/files_aftr.png" width="95%" title="Files: After">

## Usage
*   Create a new folder named `Files` in the root directory and place the files to be renamed in it.
*   In the index file, create your pattern (with a rename method)
*   There are two ways to use the pattern:
    *   First call `RenameFiles.usePattern(patternClass)`. Then `RenameFiles.exec()`
    *   Second, `RenameFiles.exec({ usePattern: patternClass })` 
NB: `RenameFiles.exec()` returns a Promise: <br />
    `RenameFiles.exec({ usePattern: patternClass }).then( console.log ).catch( console.error );`
*   Then use either `npm start`, `node index` or `node .` to run.
