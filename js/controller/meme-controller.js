'use strict';

// Define init() - init the page when loaded
function init() {
    onCreateGallery();
    renderCanvas();
    renderTextInput();
    renderWorkingLine();
}

// Define onCreateGallery() - create meme gallery
function onCreateGallery() {
    const elGallery = document.querySelector('.meme-gallery');
    const memeLst = getMemeLst();

    let strsHTML = '';

    memeLst.map((meme) => {
        strsHTML += `<div class="gallery-item"><img src="${meme.url}" onclick="pickImgById(${meme.id})" /></div>\n`;
    });

    elGallery.innerHTML = strsHTML;
}



// Define renderCanvas() - rendering the canvas to the DOM
function renderCanvas() {

    // Define canvas helpers
    const elCanvas = document.querySelector("canvas");
    const ctx = elCanvas.getContext("2d");
    ctx.textAlign = 'center';

    // Handle curr meme img
    const currMeme = getCurrMeme()[0];
    const memeImg = new Image();
    memeImg.src = currMeme.url;

    // Draw curr meme img to canvas (than handle lines)
    memeImg.addEventListener('load', function () {
        ctx.drawImage(memeImg, 0, 0);

        // Handle curr meme lines
        let memeLines = getMemeLinesById(gCurrMeme);

        if (memeLines.length) {
            memeLines = memeLines[0].lines
            memeLines.forEach((line) => {
                switch (line.lineId) {
                    case 0:
                        drawStroke(ctx, line.size, line.txt, { x: 250, y: 50 });
                        break;
                    case 1:
                        drawStroke(ctx, line.size, line.txt, { x: 250, y: 450 });
                        break;
                    default:
                        drawStroke(ctx, line.size, line.txt, { x: elCanvas.width / 2, y: elCanvas.height / 2 });
                }
            })
        }

    }, false);

}

// Define drawStroke() - draw stroked and filled txt 
function drawStroke(ctx, size, line, pos) {
    ctx.font = `${size}px impact`;

    // Print stroked txt
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText(line, pos.x, pos.y);

    // Print filled txt
    ctx.fillStyle = 'white';
    ctx.fillText(line, pos.x, pos.y);
}

// Define renderTextInput();
function renderTextInput() {
    let memeLines = getMemeLinesById(gCurrMeme);
    const elTextInput = document.querySelector('.line-input');

    if (!memeLines.length) {
        elTextInput.value = '';
        return;
    }else if(!memeLines[0].lines[gCurrLine]){
        elTextInput.value = '';
        return;
    }

    elTextInput.value = memeLines[0].lines[gCurrLine].txt;
}

// Define onChangeLine() - changes line when typing
function onChangeLine(txt) {
    changeMemeLine(txt);
    renderCanvas();
}

// Define onChangeFontSize() - increase / decrease font size and render to the DOM
function onChangeFontSize(action){
    changeFontSize(action);
    renderCanvas();
}

// Define onChangeWorkingLine() - increase / decrease curr line
function onChangeWorkingLine(action){
    changeWorkingLine(action);
    renderWorkingLine();
    renderTextInput();
}

// Define renderWorkingLine() - renders the curr working line to the DOM
function renderWorkingLine(){
    const elWorkingLine = document.querySelector('[name="curr-line"]');

    elWorkingLine.innerText = getCurrWorkingLine()+1;
}

// Define onDeleteLine() - Delete curr line
function onDeleteLine(){
    deleteLine();
    renderTextInput();
    renderCanvas();
}