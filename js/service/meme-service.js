'use strict';

var gImgs = [
    {
        id: 1,
        url: 'img/meme/1.jpg',
        keywords: ['Political', 'Trump']
    },
    {
        id: 2,
        url: 'img/meme/2.jpg',
        keywords: ['Dogs', 'Cute']
    }
];

var gMeme = [
    {
        imgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                lineId: 0,
                txt: 'First line',
                size: 30
            },
            {
                lineId: 1,
                txt: 'Second line',
                size: 30
            },
            {
                lineId: 2,
                txt: 'Third line',
                size: 30
            },
        ]
    }
];

var gCurrMeme = 1;
var gCurrLine = 0;

// Define getMemeLst() - returns meme list (gImgs)
function getMemeLst() {
    return gImgs;
}


// Define getCurrMeme() - returns curr meme
function getCurrMeme() {
    return getMemeImgById(gCurrMeme);
}

// Define getMemeImgById() - return meme img from gImgs arr by id
function getMemeImgById(id) {
    return gImgs.filter((meme) => {
        if (meme.id === id) return meme;
    });
}

// Define getMemeLinesById() - returns meme lines from gMeme by id
function getMemeLinesById(id) {
    return gMeme.filter((meme) => {
        if (meme.imgId === id) return meme;
    });
}

// Define pickImgById() - change currMemeId to selected pic and render canvas
function pickImgById(id) {
    gCurrMeme = id;
    renderCanvas();
    renderTextInput();
}

// Define getMemeIdxInGMeme() - return the meme idx in gMeme arr
function getMemeIdxInGMeme(requestedId) {
    let idInArr;
    gMeme.forEach((meme, id) => {
        if (meme.imgId === requestedId) idInArr = id;
    })

    if (idInArr === undefined) {
        gMeme.push(
            {
                imgId: gCurrMeme,
                selectedLineIdx: 0,
                lines: [
                    {
                        lineId: 0,
                        txt: '',
                        size: 30
                    }
                ]
            }
        );
        return getMemeIdxInGMeme(requestedId);
    }

    return idInArr;
}

// Define changeMemeLine() - change line in gMeme
function changeMemeLine(txt) {
    const memeIdxInArr = getMemeIdxInGMeme(gCurrMeme);

    gMeme[memeIdxInArr].lines[gCurrLine].txt = txt;
}

// Define changeFontSize() - change font size of curr line on model
function changeFontSize(action) {

    const currSize = gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].size;

    switch (action) {
        case 'increase':
            if (currSize === 60) break;
            gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].size += 2;
            break;
        case 'decrease':
            if (currSize === 10) break;
            gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].size -= 2;
            break;
    }
}

// Define changeWorkingLine() - change curr line on model
function changeWorkingLine(action) {
    switch (action) {
        case 'increase':
            gCurrLine++;
            if (!gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine]) {
                gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine] = {
                    lineId: gCurrLine,
                    txt: '',
                    size: 30
                }
            }
            break;
        case 'decrease':
            if (gCurrLine === 0) break;
            gCurrLine--;
            break;
    }
}

// Define getCurrWorkingLine() - returns gCurrLine
function getCurrWorkingLine() {
    return gCurrLine;
}

// Define deleteLine() - delete curr line
function deleteLine() {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].txt = '';
}