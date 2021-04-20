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
                font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                stroke: { doStroke: true, size: 5, color: 'black' },
                pos: { x: 250, y: 50 }
            },
            {
                lineId: 1,
                txt: 'Second line',
                font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                stroke: { doStroke: true, size: 5, color: 'black' },
                pos: { x: 250, y: 450 }
            },
            {
                lineId: 2,
                txt: 'Third line',
                font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                stroke: { doStroke: true, size: 5, color: 'black' },
                pos: { x: 250, y: 250 }
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


// Define getCurrMemeImg() - returns curr meme
function getCurrMemeImg() {
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
    }
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
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].font.align = direction;
}

// Define changeTextFontFamily() - change line font family
function changeTextFontFamily(fontFamily) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].font.family = fontFamily
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
function getCurrLineStrokeColor() {
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.color;
}

//Define changeStrokeSize() - change curr line stroke size
function changeStrokeSize(size) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.size = size;
}

// Define getCurrStrokeSize() - return curr line stroke size
function getCurrStrokeSize() {
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].stroke.size;
}

// Define changeFontColor() - change curr line stroke color
function changeFontColor(color) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].font.color = color;
}

// Define getCurrLineFontColor() - return curr line stroke color
function getCurrLineFontColor() {
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].font.color;
}

// Define changeFontSize - change curr line font size
function changeFontSize(size) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].font.size = size;
}

// Define getCurrFontSize() - return curr line stroke size
function getCurrFontSize() {
    return gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[gCurrLine].font.size;
}

// Define getCurrMeme() - return curr meme info for store and restore
function getCurrMeme() {
    let currMeme = {};

    currMeme.img = getMemeImgById(gCurrMeme);
    currMeme.lines = getMemeLinesById(currMeme.img[0].id);

    return [currMeme];
}

// Define getLinePos() - return curr line position
function getLinePos() {
    const elCanvas = document.querySelector('canvas');
    const ctx = elCanvas.getContext('2d');

    let linesPos = [];

    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines.forEach((line) => {

        // Handle y
        const y1 = line.pos.y - (line.font.size + line.stroke.size);
        const y2 = line.pos.y + 10

        // Handle x
        ctx.font = `${line.font.size}px ${line.font.family}`;
        let x1;
        let x2;

        switch (line.font.align) {
            case 'right':
                x1 = line.pos.x + 10;
                x2 = line.pos.x - ctx.measureText(line.txt).width - 10;
                break;
            case 'center':
                x1 = line.pos.x - ctx.measureText(line.txt).width / 2 - 10;
                x2 = line.pos.x + ctx.measureText(line.txt).width / 2 + 10;
                break;
            case 'left':
                x1 = line.pos.x - 10;
                x2 = line.pos.x + ctx.measureText(line.txt).width + 10;
                break;
        }

        linesPos.push({
            lId: line.lineId,
            pos: { y1, y2, x1, x2 }
        })
    });

    return linesPos;
}

// Define changeLinePos() - change curr linde drag pos
function changeLinePos(line, pos) {
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[line].pos = pos;
}