'use strict'

var txtCount = 0;

var gCurrImg;

var gCanvasTxts = [];


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
    
    <div id="txt${txtCount}" class="mydiv" onmousedown="mydragg.startMoving(this,'container',event)"
     onmouseup="mydragg.stopMoving('container')">
    <input type="text" onkeyup='updateText(this,${txtCount})'>
    <i onclick=removeTxt(${txtCount}) class="fa fa-trash" aria-hidden="true"></i>    
    </div>  
`
    gCanvasTxts.push({
        text: '',
        fontColor: 'white',
        fontsize: '20px',
        xcoord: 0,
        ycoord: 8,
        display: true
    })

    renderCanvasImg();
    var id = '#txt' + txtCount;
    document.querySelector(id + ' input').style.fontSize = currSize + 'px';
    console.log(currSize);
    txtCount++;
    // var txt = document.querySelector('');
}

function removeTxt(txtIdx) {
    var id = '#txt' + txtIdx
    document.querySelector(id).classList.add('display-none');
    gCanvasTxts.display = false;

}

function renderCanvasImg() {
    var c = document.querySelector('canvas');
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
    var canvas = document.querySelector('canvas');
    elLink.href = canvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}

var currSize = 15;

function initiateFontSize() {
    currSize = document.querySelector('.fontSizeInput').value;
    console.log(currSize);
    var textDivs = document.querySelectorAll('.memeContainer input');
    changeFontSize(textDivs, currSize);
}



function changeFontSize(nodeList, wantedFontSize) {
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.fontSize = wantedFontSize + 'px';
        gCanvasTxts[i].fontSize = wantedFontSize + 'px';
    }
}

function changeFontColor() {
    var wantedFontColor = document.querySelector('.fontColor').value;    
    var textDivs = document.querySelectorAll('.memeContainer input');

    for (let i = 0; i < textDivs.length; i++) {
        textDivs[i].style.color = wantedFontColor;
        gCanvasTxts[i].fontColor = wantedFontColor;
    }
}


function getCoords(childId, parentId) {
    var parentPos = document.querySelector('#' + parentId).getBoundingClientRect(),
        childrenPos = document.querySelector('#' + childId).getBoundingClientRect(),
        relativePos = {};

    relativePos.top = childrenPos.top - parentPos.top,
        relativePos.left = childrenPos.left - parentPos.left,
        relativePos.right = childrenPos.right - parentPos.right,
        relativePos.bottom = childrenPos.bottom - parentPos.bottom;
    return relativePos;
}
// var coords = getCoords('canvas','canvas')

function renderText(canvasTxt) {
    if (!canvasTxt.display) return;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = canvasTxt.fontSize + ' ' + canvasTxt.fontSize;
    ctx.fillStyle = canvasTxt.fontColor;
    ctx.strokeText(canvasTxt.text, canvasTxt.xcoord, canvasTxt.ycoord);


}

function updateCoords(textBox) {
    getCoords(textBox, 'canvas');
    textElement.xcoord = x;
    textElement.ycoord = y
}

function updateText(textBox,id){
    // var boxId = 'txt' + id;
    gCanvasTxts[id].text = textBox.value;
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
