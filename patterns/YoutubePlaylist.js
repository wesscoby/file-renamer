const path = require('path');

class YoutubePlaylist {
    constructor(playlistPattern) {
        // Patterns
        this.filePattern = playlistPattern.filePattern; // Pattern to match for rename
        this.episodeNumber = playlistPattern.episodeNumber; // Extract episode number
        this.episodeTitle = playlistPattern.episodeTitle; // Extract episode title
    }

    static leadingZero (number) {
        if (number <= 9) {
            number = '0' + number;
        }
        return number;
    }

    rename(file) {
        // Extract Information
        let episodeNumber = file.match(this.episodeNumber)[1];
        // Add a leading zero to 1-digit episode numbers
        episodeNumber = YoutubePlaylist.leadingZero(episodeNumber);
        let episodeTitle = file.match(this.episodeTitle)[1];
        // Return new file name
        return `${episodeNumber}. ${episodeTitle.trim()}${path.extname(file)}`;
    }
}

module.exports = YoutubePlaylist;
