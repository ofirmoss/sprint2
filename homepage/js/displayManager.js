function toggleSearch(){
    document.querySelector('.search-box').classList.remove('display-none');
    }
    
    function goToProtfolio(){
        document.querySelector('.galleryContainer').classList.remove('display-none');
        document.querySelector('.bottom-nav').classList.remove('display-none');
        document.querySelector('.aboutContainer').classList.add('display-none');
        document.querySelector('.contactContainer').classList.add('display-none');
        document.querySelector('.keywords').classList.add('display-none');
    
    }
    
    function goToAbout(){
        document.querySelector('.aboutContainer').classList.remove('display-none');
        document.querySelector('.galleryContainer').classList.add('display-none');
        document.querySelector('.contactContainer').classList.add('display-none');
        document.querySelector('.bottom-nav').classList.add('display-none');
        document.querySelector('.keywords').classList.add('display-none');
    }
    
    function goToContact(){
        document.querySelector('.contactContainer').classList.remove('display-none');
        document.querySelector('.galleryContainer').classList.add('display-none');
        document.querySelector('.aboutContainer').classList.add('display-none');
        document.querySelector('.bottom-nav').classList.add('display-none');
        document.querySelector('.keywords').classList.add('display-none');
    }
    function goToKeyWords(){
        document.querySelector('.keywords').classList.remove('display-none');
        document.querySelector('.search-box').classList.add('display-none');
        document.querySelector('.galleryContainer').classList.add('display-none');        

    }   