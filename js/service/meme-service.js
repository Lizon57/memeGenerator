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
                txt: 'First line'
            },
            {
                lineId: 1,
                txt: 'Second line'
            },
            {
                lineId: 2,
                txt: 'Third line'
            },
        ]
    }
];

var gCurrMeme = 1;

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
                        txt: ''
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

    gMeme[memeIdxInArr].lines[0].txt = txt;
}