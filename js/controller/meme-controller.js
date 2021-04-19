'use strict';

// Define init() - init the page when loaded
function init() {
    onCreateGallery();
    renderCanvas();
}

// Define onCreateGallery() - create meme gallery
function onCreateGallery() {
    const gallery = document.querySelector('.meme-gallery');
    const memeLst = getMemeLst();

    let strsHTML = '';

    memeLst.map((meme) => {
        strsHTML += `<div class="gallery-item"><img src="${meme.url}" onclick="pickImgById(${meme.id})" /></div>\n`;
    });

    gallery.innerHTML = strsHTML;
}



// Define renderCanvas() - rendering the canvas to the DOM
function renderCanvas() {

    // Define canvas helpers
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = '30px Impact';
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
                        drawStroke(ctx, line.txt, { x: 250, y: 50 });
                        break;
                    case 1:
                        drawStroke(ctx, line.txt, { x: 250, y: 450 });
                        break;
                    default:
                        drawStroke(ctx, line.txt, { x: canvas.width / 2, y: canvas.height / 2 });
                }
            })
        }

    }, false);

}

// Define drawStroke() - draw stroked and filled txt 
function drawStroke(ctx, line, pos) {

    // Print stroked txt
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText(line, pos.x, pos.y);

    // Print filled txt
    ctx.fillStyle = 'white';
    ctx.fillText(line, pos.x, pos.y);
}

// Define onChangeLine() - changes line when typing
function onChangeLine(txt) {
    changeMemeLine(txt);
    renderCanvas();
}