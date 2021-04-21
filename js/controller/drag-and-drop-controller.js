'use strict';

// Define Helpers
let gStartPos;
let gIsDraging = false;
let gLineDrag;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


// Define getEvPos() - return ev pos on canvas
function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    };

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    };

    return pos;
}

// Define dadDown() - handle drag and drop: mouse down / touch start
function dadDown() {
    const pos = getEvPos(event);
    const lineClicked = isLineClicked(pos)

    if (typeof lineClicked !== "object") return;

    gLineDrag = lineClicked.lId;
    changeWorkingLine(gLineDrag);
    initEditor();

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