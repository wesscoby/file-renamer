const State = require('./log/State'); // State singleton
const { files, shouldRename, renameFile } = require('./handleFileRename');
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

// Start Renaming
files
    .filter(file => shouldRename(file, youtubePlaylistPattern) )
    .forEach(file => renameFile(file, youtubePlaylistPattern) );

// Completion Information
log( State.showLog() );
