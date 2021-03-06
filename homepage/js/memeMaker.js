'use strict'
var gCanvWidth = 500;

var gCanvHeight = 500;

var txtCount = 0;

var gCurrImg;

var gCanvasTxts = [];

var currSize = '30px';

var currColor = 'white';


window.onload = function () {
    renderCanvasImg();
};

function createMeme(imgId) {
    document.querySelector('canvas').innerHTML = `<img class="memeImg" src="img/memes/${imgId}.jpg">`
    renderCanvasImg();
}

function addtxt() {
    
    var memeContainer = document.querySelector('.memeContainer');
    memeContainer.innerHTML += `
    
    <div id="txt${txtCount}" class="mydiv" on-tap="mydragg.startMoving(this,'container',event)" onmousedown="mydragg.startMoving(this,'container',event)"
     onmouseup="mydragg.stopMoving('container')">
    <input type="text" onkeyup='updateText(this,${txtCount})'>
    <i onclick=removeTxt(${txtCount}) class="fa fa-trash" aria-hidden="true"></i>    
    </div>  
`
    gCanvasTxts.push({
        text: '',
        fontColor: currColor,
        fontSize: currSize,
        xcoord: 0,
        ycoord: 0,
        display: true
    })

    renderCanvasImg();
    var id = '#txt' + txtCount;
    document.querySelector(id + ' input').style.fontSize = currSize + 'px';
    // console.log(currSize);
    txtCount++;
    // var txt = document.querySelector('');
    syncUpdateTextBoxes()
    changeFontColor();
    // renderTexts();

}

function removeTxt(txtIdx) {
    var id = '#txt' + txtIdx
    document.querySelector(id).classList.add('hide');
    gCanvasTxts.display = false;

}

function renderCanvasImg() {
    var c = document.querySelector('canvas');
    c.width = gCanvWidth;
    c.height = gCanvHeight;
    var ctx = c.getContext('2d');
    var img = document.querySelector('.memeImg');
    ctx.drawImage(img, 0, 0, c.width, c.height);
}


var mydragg = function () {
    return {
        move: function (divid, xpos, ypos) {
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving: function (divid, container, evt) {
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
                divTop = divid.style.top,
                divLeft = divid.style.left,
                eWi = parseInt(divid.style.width),
                eHe = parseInt(divid.style.height),
                cWi = parseInt(document.querySelector('.memeContainer').style.width),
                cHe = parseInt(document.querySelector('.memeContainer').style.height);
            document.querySelector('.memeContainer').style.cursor = 'move';
            divTop = divTop.replace('px', '');
            divLeft = divLeft.replace('px', '');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function (evt) {
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                // console.log('x coordinate:',aX);
                // console.log('y coordinate:',aY);
                if (aX < 0) aX = 0;
                if (aY < 0) aY = 0;
                // if (aX > 80) aX = 80;
                // if (aY > 150) aY = 150;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe - eHe;
                mydragg.move(divid, aX, aY);
                updateCoords(divid);
            }
        },
        stopMoving: function (container) {
            var a = document.createElement('script');
            document.querySelector('.memeContainer').style.cursor = 'default';
            document.onmousemove = function () { }
        },
    }
}();


function downloadImg(elLink) {
    renderTexts();
    var canvas = document.querySelector('#canvas');
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
    
}

function initiateFontSize() {
    currSize = document.querySelector('.fontSizeInput').value;
    // console.log(currSize);
    var textDivs = document.querySelectorAll('.memeContainer input');
    changeFontSize(textDivs, currSize);
}



function changeFontSize(nodeList, wantedFontSize) {
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.fontSize = wantedFontSize + 'px';
        gCanvasTxts[i].fontSize = wantedFontSize*1.8 + 'px';
    }
}

function changeFontColor() {
    currColor = document.querySelector('.fontColor').value;    
    var textDivs = document.querySelectorAll('.memeContainer input');

    for (let i = 0; i < textDivs.length; i++) {
        textDivs[i].style.color = currColor;
        gCanvasTxts[i].fontColor = currColor;
    }
}


function getCoords(childEl, parentId) {
    var parentPos = document.querySelector('#' + parentId).getBoundingClientRect(),
        // childrenPos = document.querySelector('#' + childId).getBoundingClientRect(),
        childrenPos = childEl.getBoundingClientRect();
    var relativePos = {};

    relativePos.top = childrenPos.top - parentPos.top,
        relativePos.left = childrenPos.left - parentPos.left,
        relativePos.right = childrenPos.right - parentPos.right,
        relativePos.bottom = childrenPos.bottom - parentPos.bottom;
    return relativePos;
}
// var coords = getCoords('canvas','canvas')

function renderText(canvasTxt,idx) {
    if (!canvasTxt.display) return;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // console.log(canvasTxt.fontSize);
    ctx.font = canvasTxt.fontSize + ' Arial';
    ctx.fillStyle = canvasTxt.fontColor;

    var renderAt = calculatePrintLocation(canvasTxt.xcoord,canvasTxt.ycoord,idx);
    // console.log(renderAt);
    ctx.strokeText(canvasTxt.text, renderAt.cordX, renderAt.cordY);
    ctx.fillText(canvasTxt.text, renderAt.cordX, renderAt.cordY);
    
}

var txtPosition = {
    posX: 150,
    posY: 150
}


function renderMobileTxt(){
    renderCanvasImg();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = 60 + 'px Arial';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    // ctx.fillStyle = canvasTxt.fontColor;
    
    var moblieInput = document.querySelector(".moblieInput");
    ctx.fillText(moblieInput.value, txtPosition.posX, txtPosition.posY);    
    ctx.strokeText(moblieInput.value, txtPosition.posX, txtPosition.posY);
    
}

function moveTxt(direction){
    if (direction === 'd') {
        txtPosition.posY += 10;
    }
    if (direction === 'u') {
        txtPosition.posY -= 10;
    }
    if (direction === 'l') {
        txtPosition.posX -= 10;
    }
    if (direction === 'r') {
        txtPosition.posX += 10;
    }
    renderMobileTxt();
}




function updateCoords(textBox) {
    var currPos = getCoords(textBox, 'canvas');
    var index = textBox.id[3]
    gCanvasTxts[index].xcoord = currPos.left;
    gCanvasTxts[index].ycoord = currPos.top;
    // console.log(gCanvasTxts[index]);
    // textElement.xcoord = x;
    // textElement.ycoord = y
}

function updateText(textBox, id) {
    // var boxId = 'txt' + id;
    // console.log(textBox);
    gCanvasTxts[id].text = textBox.value;
    // renderText(gCanvasTxts[id],id)
}

function getLoc() {
    var id = '#txt' + 0
    var elmnt = document.querySelector(id);
    var canvas = document.querySelector('#canvas');


    gCanvasTxts[0].xcoord = elmnt.offsetLeft - canvas.offsetLeft + 70;
    gCanvasTxts[0].ycoord = elmnt.offsetTop - canvas.offsetTop - 20;
    // gCanvasInfo.texts[id - 1].posX = elmnt.offsetLeft - gCanvas.offsetLeft + 20;
    // gCanvasInfo.texts[id - 1].posY = elmnt.offse tTop - gCanvas.offsetTop + 40;
    // renderCanvas()
}


function calculatePrintLocation(xcoord,ycoord,id){
    var canvContainerWidth = document.querySelector('canvas').clientWidth;
    var canvContainerHeight = document.querySelector('canvas').clientHeight;
    // var inputWidth = document.querySelector(`#txt${id} input`).clientWidth;
    // var inputHeight = document.querySelector(`#txt${id} input`).clientHeight;
    var inputHeight = 19.2;
    var inputWidth = 243;
    var cordX = (xcoord + inputWidth/2) * (gCanvWidth/canvContainerWidth);
    var cordY = (ycoord + inputHeight/2) * (gCanvHeight/canvContainerHeight);
    return {
        cordX: cordX,
        cordY: cordY
    }
}


function renderTexts(){
    for (let i = 0; i < gCanvasTxts.length; i++) {
        var textBox = gCanvasTxts[i];
        // console.log(textBox);
        renderText(textBox,i);

        
    }
}

function syncUpdateTextBoxes(){
    var boxes = document.querySelectorAll('.mydiv input');
    console.log(boxes);
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].value = gCanvasTxts[i].text;  
        
    }
}
// // dragElement(document.querySelector(".mydiv"));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//     elmnt.onmousedown = dragMouseDown;


//   function dragMouseDown(e) {
//       console.log('1 dragMouseDown');
//     e = e || window.event;
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;   
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     console.log('2s elementDrag');

//     e = e || window.event;
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     console.log('x: ',e.clientX);
//     console.log('y: ',e.clientY);
//     // set the element's new position:
//     elmnt.style.top = (elm nt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
// getCoords('txt1','canvas')
