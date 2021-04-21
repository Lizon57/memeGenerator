'use strict';

// Define getMemeLst() - returns meme list (gImgs locate at db/memeDb.js)
function getMemeLst() {
    return gImgs;
}

// Define changeCurrMeme() - change gCurrMeme (id) to selected meme
function changeCurrMeme(id) {
    gCurrMeme = id;
}
