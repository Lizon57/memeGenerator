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
                size: 30,
                align: 'center',
                font: 'impact',
                stroke: { doStroke: true, size: 5, color: 'black' },
                color: '#ffffff'
            },
            {
                lineId: 1,
                txt: 'Second line',
                size: 25,
                align: 'center',
                font: 'impact',
                stroke: { doStroke: true, size: 5, color: 'black' },
                color: '#ffffff'
            },
            {
                lineId: 2,
                txt: 'Third line',
                size: 30,
                align: 'center',
                font: 'impact',
                stroke: { doStroke: true, size: 5, color: 'black' },
                color: '#ffffff'
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
                        size: 30,
                        align: 'center',
                        font: 'impact',
                        stroke: { doStroke: true, size: 1, color: 'black' },
                        color: '#ffffff'
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

// Define changeWorkingLine() - change curr line on model
function changeWorkingLine(action) {
    switch (action) {
        case 'increase':
            gCurrLine++;
            if (!gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine]) {
                gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine] = {
                    lineId: gCurrLine,
                    txt: '',
                    size: 30,
                    align: 'center',
                    font: 'impact',
                    stroke: { doStroke: true, size: 1, color: 'black' },
                    color: '#ffffff'
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

// Define changeTextAlign() - change line alignment
function changeTextAlign(direction) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].align = direction;
}

// Define changeTextFont() - change line font
function changeTextFont(font) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].font = font
}

// Define toggleStroke() - toggle curr line stroke
function toggleStroke() {
    let stroke = gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke;
    stroke.doStroke = !stroke.doStroke;
}

// Define isCurrStroke() - returns curr line stroke size value
function isCurrStroke() {
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.doStroke;
}

// Define changeStrokeColor() - change curr line stroke color
function changeStrokeColor(color) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.color = color;
}

// Define getCurrLineStrokeColor() - return curr line stroke color
function getCurrLineStrokeColor(){
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.color;
}

//Define changeStrokeSize() - change curr line stroke size
function changeStrokeSize(size){
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.size = size;
}

// Define getCurrStrokeSize() - return curr line stroke size
function getCurrStrokeSize(){
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.size;
}

// Define changeFontColor() - change curr line stroke color
function changeFontColor(color) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].color = color;
}

// Define getCurrLineFontColor() - return curr line stroke color
function getCurrLineFontColor(){
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].color;
}

// Define changeFontSize - change curr line font size
function changeFontSize(size){
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].size = size;
}

// Define getCurrFontSize() - return curr line stroke size
function getCurrFontSize(){
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].size;
}
