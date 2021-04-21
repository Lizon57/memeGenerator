'use strict';

// Define getLinePos() - return curr line position
function getLinePos() {
    let linesPos = [];

    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines.forEach((line) => {

        // Handle y
        const y1 = line.pos.y - (line.font.size + line.stroke.size);
        const y2 = line.pos.y + 10

        // Handle x
        gCtx.font = `${line.font.size}px ${line.font.family}`;
        let x1;
        let x2;

        switch (line.font.align) {
            case 'right':
                x1 = line.pos.x + 10;
                x2 = line.pos.x - gCtx.measureText(line.txt).width - 10;
                break;
            case 'center':
                x1 = line.pos.x - gCtx.measureText(line.txt).width / 2 - 10;
                x2 = line.pos.x + gCtx.measureText(line.txt).width / 2 + 10;
                break;
            case 'left':
                x1 = line.pos.x - 10;
                x2 = line.pos.x + gCtx.measureText(line.txt).width + 10;
                break;
        }

        linesPos.push({
            lId: line.lineId,
            pos: { x1, x2, y1, y2 }
        })
    });

    return linesPos;
}

// Define isLineClicked() - check if line has clicked
function isLineClicked(clickeDpos) {
    const linePos = getLinePos();
    let lineClicked;

    // If clicked on line set lineClicked (id & pos)
    linePos.forEach((line) => {
        if (clickeDpos.x > line.pos.x1 * resizer &&
            clickeDpos.x < line.pos.x2 * resizer &&
            clickeDpos.y > line.pos.y1 * resizer &&
            clickeDpos.y < line.pos.y2 * resizer) {
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

// Define changeLinePos() - change curr linde drag pos
function changeLinePos(line, pos) {
    pos = {
        x: pos.x / resizer,
        y: pos.y / resizer
    }
    gMeme[getMemeIdxInGMeme(gCurrMeme)].lines[line].pos = pos;
}
