'use strict';

// Define renderGallery() - create meme gallery
function renderGallery() {
    const elGallery = document.querySelector('.meme-gallery');
    const memeLst = getMemeLst();

    let strsHTML = '';

    memeLst.map((meme) => {
        strsHTML += `<div class="gallery-item">
            <img src="${meme.url}" onclick="onChangeImg(${meme.id})" />
        </div>\n`;
    });

    elGallery.innerHTML = strsHTML;
}

// Define onChangeImg() - handle meme pick from gallery
function onChangeImg(id){
    changeCurrMemeVar(id);
    initCanvasAndEditor();
    renderSection('meme-editor-section');
}