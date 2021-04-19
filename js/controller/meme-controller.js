'use strict';

// Define init() - init the page when loaded
function init() {
    onCreateGallery();
    renderTextInput();
    renderWorkingLine();
    toggleStrokeBtn();
    renderStrokeColorPicker();
    renderStrokeSize();
    renderFontColorPicker();
    renderFontSize();
    renderCanvas();
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
                        drawLine(ctx, line.txt, line.size, line.align, line.font, line.stroke, line.color, { x: 250, y: 50 });
                        break;
                    case 1:
                        drawLine(ctx, line.txt, line.size, line.align, line.font, line.stroke, line.color, { x: 250, y: 450 });
                        break;
                    default:
                        drawLine(ctx, line.txt, line.size, line.align, line.font, line.stroke, line.color, { x: elCanvas.width / 2, y: elCanvas.height / 2 });
                }
            })
        }

    }, false);

}

// Define drawLine() - draw text line to canvas
function drawLine(ctx, line, size, align, font, stroke, color, pos) {
    ctx.font = `${size}px ${font}`;
    ctx.textAlign = align;

    // Handle stroke
    if (!stroke.doStroke) ctx.lineWidth = 0;
    else {
        ctx.lineWidth = stroke.size;
        ctx.strokeStyle = stroke.color;
        ctx.strokeText(line, pos.x, pos.y);
    }

    // Print filled txt
    ctx.fillStyle = color;
    ctx.fillText(line, pos.x, pos.y);
}

// Define renderTextInput();
function renderTextInput() {
    let memeLines = getMemeLinesById(gCurrMeme);
    const elTextInput = document.querySelector('.line-input');

    if (!memeLines.length) {
        elTextInput.value = '';
        return;
    } else if (!memeLines[0].lines[gCurrLine]) {
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

// Define onChangeWorkingLine() - increase / decrease curr line
function onChangeWorkingLine(action) {
    changeWorkingLine(action);
    renderWorkingLine();
    renderStrokeColorPicker();
    renderStrokeSize();
    renderFontColorPicker();
    renderFontSize();
    renderTextInput();
}

// Define renderWorkingLine() - renders the curr working line to the DOM
function renderWorkingLine() {
    const elWorkingLine = document.querySelector('[name="curr-line"]');

    elWorkingLine.innerText = getCurrWorkingLine() + 1;
}

// Define onDeleteLine() - Delete curr line
function onDeleteLine() {
    deleteLine();
    renderTextInput();
    renderCanvas();
}

// Define onChangeTextAlign() - change line alignment
function onChangeTextAlign(direction) {
    changeTextAlign(direction);
    renderCanvas();
}

// Define onSelectFont() - change line font
function onSelectFont(font) {
    changeTextFont(font);
    renderCanvas();
}

// Define onToggleStroke - toggle line stroke
function onToggleStroke() {
    toggleStroke();
    toggleStrokeBtn();
    renderCanvas();
}

// Define toggleStrokeBtn() - render Stroke / not stroke btn
function toggleStrokeBtn() {
    const elStrokeBtn = document.querySelector('.fa-stroke');

    if (isCurrStroke()) {
        elStrokeBtn.style['-webkit-text-stroke'] = '1px black';
    } else {
        elStrokeBtn.style['-webkit-text-stroke'] = '0';
    }
}

// Define onChangeStrokeColor() - change stroke color
function onChangeStrokeColor(color){
    changeStrokeColor(color);
    renderCanvas();
}

// Define renderStrokeColorPicker() - render stroke color picker to curr line color
function renderStrokeColorPicker(){
    let elColorPicker = document.querySelector('input[name="stroke-color-picker"]');

    elColorPicker.value = getCurrLineStrokeColor();
}

// Define onChangeStrokeSize() - handle change stroke size
function onChangeStrokeSize(size){
    changeStrokeSize(size);
    renderStrokeSize(size);
    renderCanvas();
}

// Define renderStrokeSize() - render curr stroke size to dom
function renderStrokeSize(size = getCurrStrokeSize()){
    let elStrokeSizeRange = document.querySelector('.curr-stroke');

    elStrokeSizeRange.innerText = size + 'px';
}

// Define onChangeFontColor() - change stroke color
function onChangeFontColor(color){
    changeFontColor(color);
    renderCanvas();
}

// Define renderFontColorPicker() - render font color picker to curr line color
function renderFontColorPicker(){
    let elColorPicker = document.querySelector('input[name="font-color-picker"]');

    elColorPicker.value = getCurrLineFontColor();
}

// Define onChangeStrokeSize() - handle change font size
function onChangeFontSize(size){
    changeFontSize(size);
    renderFontSize(size);
    renderCanvas();
}

// Define renderFontSize() - render curr stroke size to dom
function renderFontSize(size = getCurrFontSize()){
    let elStrokeSizeRange = document.querySelector('.curr-font-size');

    elStrokeSizeRange.innerText = size + 'px';
}