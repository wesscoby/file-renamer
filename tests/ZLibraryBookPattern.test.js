// Test to ensure the rename method of the ZLibraryBookPattern works
// This pattern has two expected outputs
const ZLibraryBookPattern = require('../patterns/ZLibraryBookPattern');

// First expected output: Books with up to 3 authors
test('Should rename books with up to 3 authors', () => {
    let file = "[Boris_Dinkevich,_Ilya_Gelman]_The_Complete_Redux_Book(z-lib.org).pdf";
    let expected_output = "The Complete Redux Book - Boris Dinkevich, Ilya Gelman.pdf";
    expect(ZLibraryBookPattern.rename(file)).toBe(expected_output);
});

// Second expected output: Books with four or more authors
test('Should rename books with 4 or more authors', () => {
    let file = "[Mike_Cantelon,_Marc_Harter,_T.J._Holowaychuk,_Nathan_Rajlich]_Node.js_in_Action(z-lib.org).pdf";
    let expected_output = "Node.js in Action - Mike Cantelon et al.pdf";
    expect(ZLibraryBookPattern.rename(file)).toBe(expected_output);
});
