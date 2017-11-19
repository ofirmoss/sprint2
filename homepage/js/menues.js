'use strict'

var prevPage = 'galleryContainer';

function changePage(newPage) {
    document.querySelector(`.${newPage}`).classList.toggle('hider');
    document.querySelector(`.${prevPage}`).classList.toggle('hider'); 
    prevPage = newPage;   
}

