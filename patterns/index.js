/*
*   Import all Pattern singletons created into this file
*   Export one object containing all instances
*   NB: All patterns must have a rename function
*       which will be used for the renaming.
*       Also, not all Patterns have to be singletons
*/

const zLibraryBookPattern = require('./ZLibraryBookPattern');
const YoutubePlaylist = require('./YoutubePlaylist');

module.exports = {
    zLibraryBookPattern,
    YoutubePlaylist
};
