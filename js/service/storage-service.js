'use strict';

const KEY = 'memes';

// Define getMemeFromStorage() - return memes saved at storage
function getMemeFromStorage() {
    return JSON.parse(localStorage.getItem(KEY));
}

// Define storeMeme() - storge saved meme at storage
function storeMeme(meme) {
    let memesOnStorage = getMemeFromStorage();

    // If there is no meme saved yet - make curr meme as arr and store
    if (!memesOnStorage) {
        meme = [meme];
        localStorage.setItem(KEY, JSON.stringify(meme));
        return;
    }

    // if there are meme(s) saved - push curr meme to the arr and store
    memesOnStorage.push(meme);
    localStorage.setItem(KEY, JSON.stringify(memesOnStorage));
}