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
        id: "6",
        url: "img/memes/6.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "7",
        url: "img/memes/7.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "8",
        url: "img/memes/8.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "9",
        url: "img/memes/9.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "10",
        url: "img/memes/10.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "11",
        url: "img/memes/11.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "12",
        url: "img/memes/12.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "13",
        url: "img/memes/13.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "14",
        url: "img/memes/14.jpg",
        keywords: ["baby", "success", "victory"]
    }, {
        id: "15",
        url: "img/memes/15.jpg",
        keywords: ["baby", "success", "victory"]
    }
];

function init() {
    renderImgs(imgs);
    console.log('load')
    renderKeyWords(imgs);
}

function renderImgs(imgs) {
    var strHtml = '';

    imgs.forEach(function (img) {
        strHtml += `<img onclick= "createMeme(${img.id}) ; goToMemeMaker() ; saveCurrImg(${img.id})" src="${img.url}">`
    });

    var gallery = document.querySelector('.imgs');
    gallery.innerHTML = strHtml;
}



function renderKeyWords(imgs) {
    var strHtml = '';
    var keywordsRepeats = checkreapets(imgs);
    // console.log(keywordsRepeats);

    keywordsRepeats.forEach(function (keyword) {
        if (keyword.repeats === 1) strHtml += `<h6 onclick = "filterKey(this)">${keyword.txt} </h6>`;
        else if (keyword.repeats <= 10) strHtml += `<h5 onclick = "filterKey(this)">${keyword.txt} </h5>`;
        else if (keyword.repeats <= 20) strHtml += `<h4 onclick = "filterKey(this)">${keyword.txt} </h4>`;
        else if (keyword.repeats <= 30) strHtml += `<h3 onclick = "filterKey(this)">${keyword.txt} </h3>`;
        else if (keyword.repeats <= 40) strHtml += `<h2 onclick = "filterKey(this)">${keyword.txt} </h2">`;
        else if (keyword.repeats <= 50) strHtml += `<h1 onclick = "filterKey(this)">${keyword.txt} </h1>`;
    })

    var keywords = document.querySelector('.keywords');
    // console.log(strHtml);
    keywords.innerHTML = strHtml;
}



function checkreapets(imgs) {
    var repeatscount = [{
        txt: imgs[0].keywords[0],
        repeats: 1
    }];
    var counter = 1;

    for (var i = 0; i < imgs.length; i++) {
        for (var j = 0; j < imgs[i].keywords.length; j++) {
            var currWord = imgs[i].keywords[j];
            repeatscount.forEach(function (keyword) {
                if (keyword.txt === currWord) counter++;
            })
            if (counter === 1) {
                repeatscount.push({
                    txt: currWord,
                    repeats: counter
                });
            }
            repeatscount.forEach(function (keyword) {
                if (keyword.txt === currWord) {
                    keyword.repeats = counter;
                }
            });
            counter = 1;
        }

    }

    repeatscount[0].repeats -= 1;
    return repeatscount;
}



function filterTags(tagInput, imgs) {
    var tags = tagInput.split(' ');
    var filtered = imgs.slice();
    for (let i = 0; i < tags.length; i++) {
        var tag = tags[i];

        filtered = filtered.filter(function isContainingTag(img) {
            return (img.keywords.indexOf(tag) !== -1)
        })
    }
    // console.log(filtered);
    return filtered;
}

function renderSearch() {
    // console.log(input);
    var input = document.querySelector('.searchInput').value;
    var filtered = filterTagsByChars(input, imgs);
    renderImgs(filtered);
}


// function listenToSearch() {

//     if (event.keyCode === 13) {
//         var userInput = document.querySelector('.search-box').value
//         renderSearch(userInput);
//     };

// }
 
 window.onload =  init();


 function filterTagsByChars(tagInput, imgs) {
    var tags = tagInput.split(' ');
    var filtered = imgs.slice();
    for (let i = 0; i < tags.length; i++) {
        var tag = tags[i];
        filtered = filtered.filter(function isContainingTag(img,idx) {
            for (let j = 0; j < img.keywords.length; j++) {
                var keyword = img.keywords[j];

                if(keyword.indexOf(tag) !== -1) return true;
            }
        })
    }
    // console.log(filtered);
    return filtered;
}


function filterKey(ElKeyword){
var toFilter = ElKeyword.innerText
var filtered = filterTags(toFilter,imgs);
renderImgs(filtered)
document.querySelector('.imgs').classList.remove('display-none');
document.querySelector('.keywords').classList.add('display-none');

}

// var tags = tagInput.split(' ');
// var filtered = imgs.slice();
// for (let i = 0; i < tags.length; i++) {
//     var tag = tags[i];
//     for (let j = 0; j < imgs.length; j++) {
//         var img = imgs[j];
//         imgs[j].filter(function isContaining(img,idx){
            
//         })
        
//     }
    
// }


































// var searchListening = false;

// function toggleEventListener() {
//     console.log(searchListening);
//     if(!searchListening){
//         document.addEventListener("keydown",listenToSearch,true)
//         searchListening = !searchListening;
//     }else{
//         document.removeEventListener("keydown",listenToSearch,true);
//         searchListening = !searchListening;
//     }


// function toggleEventListener()

// function renderHexaImgs(imgs) {
//     var strHtml = '';

//     imgs.forEach(function (img, idx) {
//         strHtml +=         ` <div class="hexagon>
//         <div class="hexTop"></div>
//         <div class="hexBottom"></div>
//       </div>

//      `
//     });
// console.log(strHtml);
//     var gallery = document.querySelector('.imgs');
//     gallery.innerHTML = strHtml;
// }



// function renderImgs(imgs) {
//     var strHtml = '';

//     imgs.forEach(function (img, idx) {
//         strHtml += `<img src="img/memes/${idx}.jpg" >`
//     });

//     var gallery = document.querySelector('.imgs');
//     gallery.innerHTML = strHtml;
// }