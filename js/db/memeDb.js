'use strict';

// Memes img info: id, url and keywords
let gImgs = [
    {
        id: 1,
        url: 'img/meme/1.jpg',
        keywords: ['Political', 'Trump', 'Funny face']
    },
    {
        id: 2,
        url: 'img/meme/2.jpg',
        keywords: ['Dogs', 'Cute']
    },
    {
        id: 3,
        url: 'img/meme/3.jpg',
        keywords: ['Dog', 'Cute', 'Baby']
    },
    {
        id: 4,
        url: 'img/meme/4.jpg',
        keywords: ['Cat', 'Cute', 'Sleep']
    },
    {
        id: 5,
        url: 'img/meme/5.jpg',
        keywords: ['Baby', 'Yay', 'success']
    },
    {
        id: 6,
        url: 'img/meme/6.jpg',
        keywords: ['History', 'Aliens', 'Afro-american']
    },
    {
        id: 7,
        url: 'img/meme/7.jpg',
        keywords: ['Baby', 'Cute', 'Afro-american']
    },
    {
        id: 8,
        url: 'img/meme/8.jpg',
        keywords: ['Magic', 'Charly', 'Bromas']
    },
    {
        id: 9,
        url: 'img/meme/9.jpg',
        keywords: ['Baby', 'Cute', 'Bromas', 'Mock']
    },
    {
        id: 10,
        url: 'img/meme/10.jpg',
        keywords: ['Funny', 'Barack Obama', 'Afro-american']
    },
    {
        id: 11,
        url: 'img/meme/11.jpg',
        keywords: ['Gays', 'Cute', 'Afro-american', 'kissing']
    },
    {
        id: 12,
        url: 'img/meme/12.jpg',
        keywords: ['Haim Hecht', 'Reproof', 'Israel']
    },
    {
        id: 13,
        url: 'img/meme/13.jpg',
        keywords: ['Cheers', 'Drink', 'Fun']
    },
    {
        id: 14,
        url: 'img/meme/14.jpg',
        keywords: ['Matrix', 'Morpheus', 'Laurence Fishburne', 'Afro-american']
    },
    {
        id: 15,
        url: 'img/meme/15.jpg',
        keywords: ['Reproof']
    },
    {
        id: 16,
        url: 'img/meme/16.jpg',
        keywords: ['Austin Powers', 'Dr. Evil', 'Funny', 'Mike Myers']
    },
    {
        id: 17,
        url: 'img/meme/17.jpg',
        keywords: ['Putin', 'Angry', 'Dare you']
    },
    {
        id: 18,
        url: 'img/meme/18.jpg',
        keywords: ['Toy Story', 'Space', 'Disney']
    }
];

// Memes base lines (this model is changeable)
let gMeme = [
    {
        imgId: 1,
        lines: [
            {
                lineId: 0,
                txt: 'First line',
                font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                stroke: { doStroke: true, size: 5, color: '#000000' },
                pos: { x: 250, y: 50 }
            },
            {
                lineId: 1,
                txt: 'Second line',
                font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                stroke: { doStroke: true, size: 5, color: '#000000' },
                pos: { x: 250, y: 450 }
            },
            {
                lineId: 2,
                txt: 'Third line',
                font: { family: 'impact', size: 30, align: 'center', color: '#ffffff' },
                stroke: { doStroke: true, size: 5, color: '#000000' },
                pos: { x: 250, y: 250 }
            },
        ]
    }
];

// Useable stickers
let gStickers = ['😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🤪', '😎', '😈',
    '🙈', '🙉', '🙊', '🐪', '🐫', '🐸', '🐬', '🐦', '🐔', '🦃',
    '🍇', '🍈', '🍉', '🍊', '🍌', '⚽', '⚾', '🏀', '🏐', '🏈'];