'use strict'

var imgs = [{
        id: "0",
        url: "img/memes/0.jpg",
        keywords: ""
    },
    {
        id: "1",
        url: "img/memes/1.jpg",
        keywords: ""
    },
    {
        id: "2",
        url: "img/memes/2.jpg",
        keywords: ""
    },
    {
        id: "3",
        url: "img/memes/3.jpg",
        keywords: ""
    },
    {
        id: "4",
        url: "img/memes/4.jpg",
        keywords: ""
    }, {
        id: "5",
        url: "img/memes/5.jpg",
        keywords: ""
    }
];

renderImgs(imgs);

function renderImgs(imgs) {
    var strHtml = '';

    imgs.forEach(function (img, idx) {
        strHtml += `<img src="img/memes/${idx}.jpg" >`
    });

    var gallery = document.querySelector('.imgs');
    gallery.innerHTML = strHtml;
}