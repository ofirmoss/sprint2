'use strict'

var imgs = [{
        id: "0",
        url: "img/memes/0.jpg",
        keywords: ["burning", "smile", "child"]
    },
    {
        id: "1",
        url: "img/memes/1.jpg",
        keywords: ["crying", "jorden", "sad"]
    },
    {
        id: "2",
        url: "img/memes/2.jpg",
        keywords: ["cartoon", "blame", "not"]
    },
    {
        id: "3",
        url: "img/memes/3.jpg",
        keywords: ["one", "man", "simply"]
    },
    {
        id: "4",
        url: "img/memes/4.jpg",
        keywords: ["crazy", "girl", "smile"]
    }, {
        id: "5",
        url: "img/memes/5.jpg",
        keywords: ["baby", "success", "victory"]
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



function renderKeywords(imgs) {
    var strHtml = '';
    var keywordsRepeats = checkreapets(imgs);

    keywordsRepeats.forEach(function (keyword) {
        if (keyword.repeats === 1) strHtml += `<h6>${keyword.txt} </h6>`;
        else if (keyword.repeats <= 10) strHtml += `<h5>${keyword.txt} </h5>`;
        else if (keyword.repeats <= 20) strHtml += `<h4>${keyword.txt} </h4>`;
        else if (keyword.repeats <= 30) strHtml += `<h3>${keyword.txt} </h3>`;
        else if (keyword.repeats <= 40) strHtml += `<h2>${keyword.txt} </h2>`;
        else if (keyword.repeats <= 50) strHtml += `<h1>${keyword.txt} </h1>`;
    })

    var keywords = document.querySelector('.keywords');
    keywords.innerHTML = strHtml;
}



function checkreapets(imgs) {
    var repeatscount = [{txt: imgs[0].keywords[0], repeats: 1}];
    var counter = 1;

    for (var i = 0; i < imgs.length; i++) {
        for (var j = 0; j < imgs[i].keywords.length; j++) {
            var currWord = imgs[i].keywords[j];
            repeatscount.forEach(function (count) {
                if (count.txt === currWord) counter++;
            })
        if (counter === 1) {
            repeatscount.push({
                txt: currWord,
                repeats: counter
            });
        }  repeatscount.forEach(function (count) {
            if (count.txt === currWord) {
                count.repeats= counter;
            }
        });
        counter = 1;
    }

}

repeatscount[0].repeats-=1;
return repeatscount;
}