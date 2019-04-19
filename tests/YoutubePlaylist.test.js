// Test to ensure the rename method of the YoutubePlaylist works
// The YoutubePlaylist pattern class has to be instantiated with
// the patterns to match for the renaming function to work.

const YoutubePlaylist = require('../patterns/YoutubePlaylist');
// Pattern to test renaming with
const playlistPattern = {
    filePattern: RegExp(/^Bootstrap 4 Tutorial.\[#\d{1,2}].+\.mp4$/, 'i'),
    episodeNumber: RegExp(/^Bootstrap 4 Tutorial.\[#(\d{1,2})].+\.mp4$/, 'i'),
    episodeTitle: RegExp(/^Bootstrap 4 Tutorial.\[#\d{1,2}](.+)\.mp4$/, 'i')
};

let youtubePlaylistPattern = new YoutubePlaylist(playlistPattern);

test('Should rename playlist file', () => {
    let file = "Bootstrap 4 Tutorial [#1] Introduction, installation & basics of grid system.mp4";
    let expected_output = "01. Introduction, installation & basics of grid system.mp4";
    expect(youtubePlaylistPattern.rename(file)).toBe(expected_output);
});

