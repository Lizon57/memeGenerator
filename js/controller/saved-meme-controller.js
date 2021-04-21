'use strict';

// Avoid onload bug when section load
const elSavedSection = document.querySelector('.saved-meme');
elSavedSection.addEventListener("load", initSaved());

function initSaved() {
    renderSaved();
}

// Define renderSaved - render saved memes to the DOM
function renderSaved() {
    const savedMemes = getMemeFromStorage();
    const elSavedMemes = document.querySelector('.saved-meme-container');
    let strsHTML = '';

    if (!savedMemes) return;
    savedMemes.map((meme, idx) => {
        const memeImg = new Image();
        memeImg.src = meme[0].img[0].url;
        strsHTML += `<canvas width="${memeImg.width / RESIZER}" height="${memeImg.height / RESIZER}" name="saved-meme-${idx}" style="border: 1px solid black;"></canvas>\n`;
    });

    elSavedMemes.innerHTML = strsHTML;

    savedMemes.forEach((meme, idx) => {
        drawSavedCanvas(idx, meme);
    })
}

// Define drawSavedCanvas() - draw the saved canvas
function drawSavedCanvas(idx, meme) {

    // Define canvas helpers
    const elResoreCanvas = document.querySelector(`[name="saved-meme-${idx}"]`);
    const ctx = elResoreCanvas.getContext('2d');

    // Handle curr meme img
    const memeImg = new Image();
    memeImg.src = meme[0].img[0].url;
    const memeImgWidth = memeImg.width / RESIZER;
    const memeImgHeight = memeImg.height / RESIZER;

    // Draw curr meme img to canvas (than handle lines)
    memeImg.addEventListener('load', () => {
        ctx.drawImage(memeImg, 0, 0, memeImgWidth, memeImgHeight);

        meme[0].lines[0].lines.forEach((line) => {
            drawSavedLine(ctx, line);
        })
    });

}

// Define drawSavedLine() - draw saved line on canvas
function drawSavedLine(ctx, line) {
    ctx.font = `${line.font.size / RESIZER}px ${line.font.family}`;
    ctx.textAlign = line.font.align;

    // Handle stroke
    if (!line.stroke.doStroke) ctx.lineWidth = 0;
    else {
        ctx.lineWidth = line.stroke.size / RESIZER;
        ctx.strokeStyle = line.stroke.color;
        ctx.strokeText(line.txt, line.pos.x/RESIZER, line.pos.y/RESIZER);
    }

    // Print filled txt
    ctx.fillStyle = line.font.color;
    ctx.fillText(line.txt, line.pos.x/RESIZER, line.pos.y/RESIZER);
}