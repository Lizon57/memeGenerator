'use strict';

let gStartPos;
let gIsDraging = false;
let gLineDrag;

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
    renderStickers();
    renderCanvas();
    addListeners();
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
    const elCanvas = document.querySelector('canvas');
    const ctx = elCanvas.getContext('2d');

    // Handle curr meme img
    const currMeme = getCurrMemeImg()[0];
    const memeImg = new Image();
    memeImg.src = currMeme.url;

    // Draw curr meme img to canvas (than handle lines)
    memeImg.addEventListener('load', () => {
        ctx.drawImage(memeImg, 0, 0);

        // Handle curr meme lines
        let memeLines = getMemeLinesById(gCurrMeme);

        if (memeLines.length) {
            memeLines = memeLines[0].lines
            memeLines.forEach((line) => {
                drawLine(ctx, line.txt, line.font, line.stroke, line.pos);
            })
        }

    }, false);

}

// Define drawLine() - draw text line to canvas
function drawLine(ctx, line, font, stroke, pos) {
    ctx.font = `${font.size}px ${font.family}`;
    ctx.textAlign = font.align;

    // Handle stroke
    if (!stroke.doStroke) ctx.lineWidth = 0;
    else {
        ctx.lineWidth = stroke.size;
        ctx.strokeStyle = stroke.color;
        ctx.strokeText(line, pos.x, pos.y);
    }

    // Print filled txt
    ctx.fillStyle = font.color;
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
function onSelectFontFamily(fontFamily) {
    changeTextFontFamily(fontFamily);
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
function onChangeStrokeColor(color) {
    changeStrokeColor(color);
    renderCanvas();
}

// Define renderStrokeColorPicker() - render stroke color picker to curr line color
function renderStrokeColorPicker() {
    let elColorPicker = document.querySelector('input[name="stroke-color-picker"]');

    elColorPicker.value = getCurrLineStrokeColor();
}

// Define onChangeStrokeSize() - handle change stroke size
function onChangeStrokeSize(size) {
    changeStrokeSize(size);
    renderStrokeSize(size);
    renderCanvas();
}

// Define renderStrokeSize() - render curr stroke size to dom
function renderStrokeSize(size = getCurrStrokeSize()) {
    let elStrokeSizeRange = document.querySelector('.curr-stroke');

    elStrokeSizeRange.innerText = size + 'px';
}

// Define onChangeFontColor() - change stroke color
function onChangeFontColor(color) {
    changeFontColor(color);
    renderCanvas();
}

// Define renderFontColorPicker() - render font color picker to curr line color
function renderFontColorPicker() {
    let elColorPicker = document.querySelector('input[name="font-color-picker"]');

    elColorPicker.value = getCurrLineFontColor();
}

// Define onChangeStrokeSize() - handle change font size
function onChangeFontSize(size) {
    changeFontSize(size);
    renderFontSize(size);
    renderCanvas();
}

// Define renderFontSize() - render curr stroke size to dom
function renderFontSize(size = getCurrFontSize()) {
    let elStrokeSizeRange = document.querySelector('.curr-font-size');

    elStrokeSizeRange.innerText = size + 'px';
}

// Define onSaveMeme() - save meme to storage
function onStoreMeme() {
    storeMeme(getCurrMeme());
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
        else section.style.display = 'block';
    });
}

// Define addListeners() - add mouse and touch listners on canvas (for drag and drop)
function addListeners() {
    const elCanvas = document.querySelector('canvas');

    elCanvas.addEventListener('mousedown', dadDown);
    elCanvas.addEventListener('touchstart', dadDown);
    elCanvas.addEventListener('mousemove', dadMove);
    elCanvas.addEventListener('touchmove', dadMove);
    elCanvas.addEventListener('mouseup', dadUp);
    elCanvas.addEventListener('touchend', dadUp);
}

// Define getEvPos() - return ev pos on canvas
function getEvPos(ev) {
    return { x: ev.offsetX, y: ev.offsetY };
}

// Define isLineClicked() - check if curr line has clicked
function isLineClicked(clickeDpos) {
    const linePos = getLinePos();
    let lineClicked;

    // If clicked on line set lineClicked (id & pos)
    linePos.forEach((line) => {
        if (clickeDpos.x > line.pos.x1 &&
            clickeDpos.x < line.pos.x2 &&
            clickeDpos.y > line.pos.y1 &&
            clickeDpos.y < line.pos.y2) {
            lineClicked = {
                lId: line.lId,
                pos: {
                    x: clickeDpos.x,
                    y: clickeDpos.y
                }
            }
        }
    });

    return lineClicked;
}

// Define dadDown() - handle drag and drop: mouse down / touch start
function dadDown() {
    const pos = getEvPos(event);
    const lineClicked = isLineClicked(pos)

    if (typeof lineClicked !== "object") return;

    gLineDrag = lineClicked.lId;
    gStartPos = lineClicked.pos;
    gIsDraging = true;
    document.body.style.cursor = 'grabbing';
}

// Define dadMove() - handle drag and drop: move mouse / touch
function dadMove() {
    if (!gIsDraging) return;

    const pos = getEvPos(event);
    changeLinePos(gLineDrag, pos);
    renderCanvas();
}

// Define dadUp() - handle drag and drop: mouse up / touch end
function dadUp() {
    gIsDraging = false;
    document.body.style.cursor = 'auto';
}

// Define onDownloadMeme() - download meme as png
function onDownloadMeme(elLink) {
    const elCanvas = document.querySelector('canvas');
    let meme = elCanvas.toDataURL();
    elLink.href = meme;
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

// Define onShareMeme() - share meme to facebook
function onShareMeme(elForm, ev) {
    ev.preventDefault();
    const elCanvas = document.querySelector('canvas');
    document.getElementById('imgData').value = elCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer?u=${uploadedImgUrl}`, '_blank');
    }

    doUploadImg(elForm, onSuccess);
}

// Define doUploadImage() - try to upload image to web
function doUploadImg(elForm, onSuccess) {
    let formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

// Define onShareWhatsApp() - share to whatsapp
function onShareWhatsApp() {
    const elCanvas = document.querySelector('canvas');
    const meme = elCanvas.toDataURL('image/jpeg');
    console.log(meme)
    // window.open(`https://api.whatsapp.com/send?text=${meme}`, '_blank');
}