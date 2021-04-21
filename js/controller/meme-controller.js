'use strict';

// Helpers
const gElCanvas = document.querySelector('canvas');
const gCtx = gElCanvas.getContext('2d');
let resizer = 1;


// Define init() - init the page when loaded, init gallery only (canvas will init when a meme will be chosen)
function init() {
    renderGallery();
    renderSection('meme-gallery');
}

// Define initEditor() - run init functions for editor
function initEditor() {
    renderWorkingLine();
    renderTextInput();
    renderFontColorPicker();
    renderFontSize();
    toggleStrokeBtn();
    renderStrokeColorPicker();
    renderStrokeSize();
    renderStickers();
}

// Define initCanvasAndEditor() - run init functions for canvas and editor
function initCanvasAndEditor() {
    // Editor
    initEditor();

    // Canvas
    canvasResizer();
    renderCanvas();

    // Listeners
    addListeners();
}

// Define addListeners() - add mouse and touch listners on canvas (for drag and drop)
function addListeners() {
    // Canvas resizer (when window resize)
    window.addEventListener('resize', canvasResizer);

    // Canvas drag and drop functions
    gElCanvas.addEventListener('mousedown', dadDown);
    gElCanvas.addEventListener('touchstart', dadDown);
    gElCanvas.addEventListener('mousemove', dadMove);
    gElCanvas.addEventListener('touchmove', dadMove);
    gElCanvas.addEventListener('mouseup', dadUp);
    gElCanvas.addEventListener('touchend', dadUp);
}

// Define onSelectSection() - hide all sections but the one selected via renderSection()
function onSelectSection(section) {
    switch (section) {
        default:
        case 'Gallery':
            renderSection('meme-gallery');
            break;
        case 'Saved':
            renderSection('saved-meme');
            break;
        case 'About':
            renderSection('about');
            break;
    }
}

// Define renderSection() - hide all sections but the one selected
function renderSection(sectionName) {
    let sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        if (!section.classList.contains(sectionName)) section.style.display = 'none';
        else section.style.display = 'grid';
    });
}

// Define canvasResizer() - resize canvas when page load or page resize
function canvasResizer() {
    if (window.innerWidth < 505) {
        gElCanvas.width = 250;
        gElCanvas.height = 250;
        resizer = 0.5;
    } else if (window.innerWidth < 1100) {
        gElCanvas.width = 350;
        gElCanvas.height = 350;
        resizer = 0.7;
    } else {
        gElCanvas.width = 500;
        gElCanvas.height = 500;
        resizer = 1;
    }

    renderCanvas();
}

// Define renderCanvas() - rendering the canvas to the DOM
function renderCanvas() {

    // Handle curr meme img
    const currMeme = getCurrMemeInfo('img');
    const memeImg = new Image();
    memeImg.src = currMeme.url;
    const memeImgWidth = memeImg.width * resizer;
    const memeImgHeight = memeImg.height * resizer;

    // Draw curr meme img to canvas (than handle lines)
    memeImg.addEventListener('load', () => {
        gCtx.drawImage(memeImg, 0, 0, memeImgWidth, memeImgHeight);

        // Handle curr meme lines
        let memeLines = getMemeLinesById(gCurrMeme);

        if (memeLines.length) {
            memeLines = memeLines[0].lines
            memeLines.forEach((line) => {
                drawLine(line.txt, line.font, line.stroke, line.pos);
            })
        }

    }, false);

}

// Define drawLine() - draw text line to canvas
function drawLine(line, font, stroke, pos) {
    gCtx.font = `${font.size * resizer}px ${font.family}`;
    gCtx.textAlign = font.align;

    // Handle stroke
    if (!stroke.doStroke) gCtx.lineWidth = 0;
    else {
        gCtx.lineWidth = stroke.size * resizer;
        gCtx.strokeStyle = stroke.color;
        gCtx.strokeText(line, pos.x * resizer, pos.y * resizer);
    }

    // Print filled txt
    gCtx.fillStyle = font.color;
    gCtx.fillText(line, pos.x * resizer, pos.y * resizer);
}

// Define onChangeWorkingLine() - increase / decrease curr line
function onChangeWorkingLine(action) {
    changeWorkingLine(action);
    initEditor();
}

// Define renderWorkingLine() - renders the curr working line to the DOM
function renderWorkingLine() {
    const elWorkingLine = document.querySelector('[name="curr-line"]');
    elWorkingLine.innerText = getCurrMemeInfo('working-line');
}

// Define onDeleteLine() - Delete curr line
function onDeleteLine() {
    changeCurrMeme('delete-row');
    initCanvasAndEditor();
}

// Define onChangeLine() - change line when typing
function onChangeLine(txt) {
    changeCurrMeme('line-txt', txt);
    renderCanvas();
}

// Define onChangeFontColor() - change font color
function onChangeFontColor(color) {
    changeCurrMeme('font-color', color);
    renderCanvas();
}

// Define onChangeStrokeSize() - handle change font size
function onChangeFontSize(size) {
    changeCurrMeme('font-size', size);
    renderFontSize(size);
    renderCanvas();
}

// Define renderFontColorPicker() - render font color picker to curr line color
function renderFontColorPicker() {
    let elColorPicker = document.querySelector('input[name="font-color-picker"]');
    elColorPicker.value = getCurrMemeInfo('font-color');
}

// Define renderFontSize() - render curr stroke size to DOM
function renderFontSize(size = getCurrMemeInfo('font-size')) {
    let elFontSizeRange = document.querySelector('.curr-font-size');
    let elFontSizeRangeInput = document.querySelector('[name="font-size-picker"]');

    elFontSizeRangeInput.value = getCurrMemeInfo('font-size');
    elFontSizeRange.innerText = size + 'px';
}

// Define onSelectFont() - change line font
function onSelectFontFamily(fontFamily) {
    changeCurrMeme('font-family', fontFamily);
    renderCanvas();
}

// Define onChangeTextAlign() - change line alignment
function onChangeTextAlign(direction) {
    changeCurrMeme('text-direction', direction);
    renderCanvas();
}

// Define onChangeStrokeColor() - change stroke color
function onChangeStrokeColor(color) {
    changeCurrMeme('stroke-color', color);
    renderCanvas();
}

// Define renderStrokeColorPicker() - render stroke color picker to curr line color
function renderStrokeColorPicker() {
    let elColorPicker = document.querySelector('input[name="stroke-color-picker"]');
    elColorPicker.value = getCurrMemeInfo('stroke-color');
}

// Define onChangeStrokeSize() - handle change stroke size
function onChangeStrokeSize(size) {
    changeCurrMeme('stroke-size', size);
    renderStrokeSize(size);
    renderCanvas();
}

// Define renderStrokeSize() - render curr stroke size to the DOM
function renderStrokeSize(size = getCurrMemeInfo('stroke-size')) {
    let elStrokeSizeRange = document.querySelector('.curr-stroke');
    elStrokeSizeRange.innerText = size + 'px';
}

// Define onToggleStroke - toggle line stroke
function onToggleStroke() {
    changeCurrMeme('is-stroke');
    toggleStrokeBtn();
    renderCanvas();
}

// Define toggleStrokeBtn() - render Stroke / not stroke btn
function toggleStrokeBtn() {
    const elStrokeBtn = document.querySelector('.fa-stroke');

    if (getCurrMemeInfo('is-stroke')) {
        elStrokeBtn.style['-webkit-text-stroke'] = '1px black';
    } else {
        elStrokeBtn.style['-webkit-text-stroke'] = '0';
    }
}

// Define renderStickers() - render stickers to the DOM
function renderStickers() {
    const elStickers = document.querySelector('.stickers-container');
    let strsHTML = '';

    gStickers.map((sticker) => {
        strsHTML += `<span onclick="onAddSticker(this.innerText)">${sticker}</span>\n`;
    });

    elStickers.innerHTML = strsHTML;
}

// Define onAddSticker() - add sticker to meme
function onAddSticker(sticker) {
    addSticker(sticker);
    renderCanvas();
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

// Define onSaveMeme() - save meme to storage
function onStoreMeme() {
    storeMeme(getCurrMeme());
}