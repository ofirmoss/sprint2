'use strict'

var imgs = [{
        id: "0",
        url: "img/memes/0.jpg",
        keywords: ["burning","smile","child"]
    },
    {
        id: "1",
        url: "img/memes/1.jpg",
        keywords: ["crying","jorden","sad"]
    },
    {
        id: "2",
        url: "img/memes/2.jpg",
        keywords: ["cartoon","blame","not"]
    },
    {
        id: "3",
        url: "img/memes/3.jpg",
        keywords: ["one","man","simply"]
    },
    {
        id: "4",
        url: "img/memes/4.jpg",
        keywords: ["crazy","girl","smile"]
    }, {
        id: "5",
        url: "img/memes/5.jpg",
        keywords: ["baby","success","victory"]
    }
];

renderImgs(imgs);
renderKeywords(imgs);


function renderImgs(imgs) {
    var strHtml = '';

    imgs.forEach(function (img, idx) {
        strHtml += `<img src="img/memes/${idx}.jpg" >`
    });

    var gallery = document.querySelector('.imgs');
    gallery.innerHTML = strHtml;
}

function renderKeywords(imgs){
    var strHtml = '';
    
        imgs.forEach(function (img, idx) {
            img.keywords.forEach(function (keyword, idx) {
                strHtml += `<h3>${keyword} </h3>`
            })
            });
    
        var keywords = document.querySelector('.keywords');
        keywords.innerHTML = strHtml;
}