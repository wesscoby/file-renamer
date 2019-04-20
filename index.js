const RenameFiles = require('./RenameFiles');
const {
    zLibraryBookPattern, YoutubePlaylist
} = require('./patterns'); // Patterns

const { log } = console; // Destructure the console object

// Instantiate Patterns which are not singletons here...
const playlistPattern = {
    filePattern: RegExp(/^Bootstrap 4 Tutorial.\[#\d{1,2}].+\.mp4$/, 'i'),
    episodeNumber: RegExp(/^Bootstrap 4 Tutorial.\[#(\d{1,2})].+\.mp4$/, 'i'),
    episodeTitle: RegExp(/^Bootstrap 4 Tutorial.\[#\d{1,2}](.+)\.mp4$/, 'i')
};

let youtubePlaylistPattern = new YoutubePlaylist(playlistPattern);

// RenameFiles is a singleton
// Call usePattern(pattern) to declare pattern to use
// and call exec() to rename files in the directory
// NB: exec() returns a Promise which resolves to State.showLog()
RenameFiles.usePattern(zLibraryBookPattern);
RenameFiles
    .exec()
    .then(log)
    .catch(console.error);

