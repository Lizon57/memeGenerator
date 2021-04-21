'use strict';

let gCurrMeme = 1;
let gCurrLine = 0;

// Define getCurrMemeInfo() - returns curr meme info according to request
function getCurrMemeInfo(req) {
    const currMemeIdx = getMemeIdxInGMeme(gCurrMeme);

    switch (req) {
        case 'img':
            return getMemeImgById(gCurrMeme)[0];
        case 'working-line':
            return gCurrLine + 1;
        case 'font-color':
            return gMeme[currMemeIdx].lines[gCurrLine].font.color;
        case 'font-size':
            return gMeme[currMemeIdx].lines[gCurrLine].font.size;
        case 'font-family':
            return gMeme[currMemeIdx].lines[gCurrLine].font.family;
        case 'stroke-color':
            return gMeme[currMemeIdx].lines[gCurrLine].stroke.color;
        case 'stroke-size':
            return gMeme[currMemeIdx].lines[gCurrLine].stroke.size;
        case 'is-stroke':
            return gMeme[currMemeIdx].lines[gCurrLine].stroke.doStroke;
    }
}

// Define changeCurrMeme() - change curr meme data according to request
function changeCurrMeme(key, value) {
    const currMemeIdx = getMemeIdxInGMeme(gCurrMeme);

    switch (key) {
        case 'delete-row':
            gMeme[currMemeIdx].lines[gCurrLine].txt = '';
            break;
        case 'line-txt':
            gMeme[currMemeIdx].lines[gCurrLine].txt = value;
            break;
        case 'font-color':
            gMeme[currMemeIdx].lines[gCurrLine].font.color = value;
            break;
        case 'font-size':
            gMeme[currMemeIdx].lines[gCurrLine].font.size = value;
            break;
        case 'font-family':
            gMeme[currMemeIdx].lines[gCurrLine].font.family = value;
            break;
        case 'text-direction':
            gMeme[currMemeIdx].lines[gCurrLine].font.align = value;
            break;
        case 'stroke-color':
            gMeme[currMemeIdx].lines[gCurrLine].stroke.color = value;
            break;
        case 'stroke-size':
            gMeme[currMemeIdx].lines[gCurrLine].stroke.size = value;
            break;
        case 'is-stroke':
            gMeme[currMemeIdx].lines[gCurrLine].stroke.doStroke = !getCurrMemeInfo('is-stroke');
            break;
    }
}

// Define changeCurrMemeVar() - change gCurrMeme
function changeCurrMemeVar(id) {
    gCurrMeme = id;
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
                    font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                    stroke: { doStroke: true, size: 1, color: 'black' },
                    pos: defineLinePos(gCurrLine)
                }
            }
            break;
        case 'decrease':
            if (gCurrLine === 0) break;
            gCurrLine--;
            break;
        default:
            gCurrLine = action;
    }
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
                        font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                        stroke: { doStroke: true, size: 1, color: 'black' },
                        pos: { x: 250, y: 50 }
                    }
                ]
            }
        );
        return getMemeIdxInGMeme(requestedId);
    }

    return idInArr;
}

// Define addSticker() - add sticker line to curr meme
function addSticker(sticker) {
    let currMemeLines = gMeme[getMemeIdxInGMeme(gCurrMeme)].lines;
    currMemeLines.push({
        lineId: currMemeLines.length,
        txt: sticker,
        font: {
            family: 'impact',
            size: 30,
            align: 'center',
            color: '#000000'
        },
        pos: {
            x: 250,
            y: 250
        },
        stroke: {
            doStroke: false,
            size: 1,
            color: '#ffffff'
        }
    })
}

// Define defineLinePos() - return line pos according to currline
function defineLinePos(num) {
    switch (num) {
        case 1:
            return { x: 250, y: 50 }
            break;
        case 2:
            return { x: 250, y: 450 }
            break;
        default:
            return { x: 250, y: 250 }
    }
}

// Define getCurrMeme() - return curr meme info for store and restore
function getCurrMeme() {
    let currMeme = {};

    currMeme.img = getMemeImgById(gCurrMeme);
    currMeme.lines = getMemeLinesById(currMeme.img[0].id);

    return [currMeme];
}