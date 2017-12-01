
/*  A recursive function for listing photos.*/
// (Needs to be renamed!)  
function wrapperFunc(){
   
    function clearList(){
        var list = document.getElementById('imagelist');
        while (list.firstChild) 
            list.removeChild(list.firstChild);
    }
        
    
    function fetchPhotos(amount){

        if (amount == 0)
            return;

        var query,
            img,
            container,
            pictureUrl,
            random;

        query = document.getElementById('searchbar').value;

        setTimeout(function(){

            var photo = new UnsplashPhoto();
            /* 
                Considering that the unsplashPhoto API will only generate a new random image "perRequest" 
                (browser request that is.) I felt the need to tamper with the url to be able to display 20
                unique images. This was achived by appending a random number after the original URL.
            */
            random = Math.floor(Math.random() * 500 );
            pictureUrl = photo.all().fetch() +  random;  
            container = document.createElement('LI');
            container.setAttribute('class', 'imagelist__item animated zoomIn');
            img = document.createElement('IMG');
            img.setAttribute('src', pictureUrl);
            img.setAttribute('class', 'imagelist__image');
            document.getElementById('imagelist').appendChild(container).appendChild(img);

            fetchPhotos(amount - 1);

        }, 100);
    }
    clearList();
    fetchPhotos(20);
}
