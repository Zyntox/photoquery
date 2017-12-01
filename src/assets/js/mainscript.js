function selectQuery(element){

    var text = 'search in ' + element,
        searchbar = document.getElementById('searchbar'),
        queryChildren = document.getElementById('classlist').children,
        topicChildren = document.getElementById('topiclist').children,
        element = document.getElementById(element);

    searchbar.setAttribute('placeholder', text);

    /*  If it wasn't the category button that was pressed, make sure so that the 'topic' buttons aren't accessible
        anymore. (Also: revert their 'values' to default state.)
    */
    if (element.id != "category"){
        document.getElementById('topiclist').setAttribute('class', 'querylist animated fadeOut');
        for (var y = 0; y < topicChildren.length; y++){
            topicChildren[y].setAttribute('class', 'querylist__option');
            topicChildren[y].setAttribute('value', '0');
        }
    }
    // Resets the other query values back to default state.
    for (var i = 0; i < queryChildren.length; i++){
        queryChildren[i].setAttribute('class', 'querylist__option');
        queryChildren[i].setAttribute('value', '0');
    }

    // if the 'Category' button was pressed, show the list of topics.
    if (element.id == "category")
        document.getElementById('topiclist').setAttribute('class', 'querylist animated fadeIn');

    // Set the pressed button as the active button and give it the value of '1'.
    element.setAttribute('class', 'querylist__option querylist__option--active');
    element.setAttribute('value', '1');

}


function selectTopic(element){

    var topicChildren = document.getElementById('topiclist').children,
        searchbar = document.getElementById('searchbar');

    searchbar.setAttribute('placeholder', 'Search in ' + element);
    element = document.getElementById(element);

    //reset the topic buttons to their default states.
    for(var i = 0; i < topicChildren.length; i++){
        topicChildren[i].setAttribute('class', 'querylist__option');
        topicChildren[i].setAttribute('value', '0');
    }

    element.setAttribute('class', 'querylist__option querylist__option--active');
    element.setAttribute('value', '1');
}




/*  Function that is used in collaboration with the search function. This function returns what queries the user has
    marked as active.
*/
function fetchSearchQueries(list){
    list = document.getElementById(list).children;

    for (var i = 0; i < list.length; i++){
        if (list[i].value == '1')
            return list[i].id;
    }
    return false;

}


function userSearch(){

    function clearList(){
        var list = document.getElementById('imagelist');
        while (list.firstChild)
            list.removeChild(list.firstChild);
    }



    function fetchPhotos(amount){


        if (amount == 0)
            return;

        var query = fetchSearchQueries('classlist'),
            topic = fetchSearchQueries('topiclist'),
            userInput = document.getElementById('searchbar').value,
            photo = new UnsplashPhoto(),
            link,
            random,
            container,
            img,
            url;

        console.log(photo);
        random = Math.floor(Math.random() * 500 );

        if (!query){

            /*  Considering that the unsplashPhoto API will only generate a new random image "perRequest"
                (browser request that is.) I felt the need to tamper with the url to be able to display 20
                unique images. This was achived by appending a random number after the original URL.
            */
            url = photo.all().fetch() +  random;

        }

        else if(query == "category"){

            if (!topic)
                topic = "buildings"

            url = photo.all().fromCategory(topic).fetch();

            url = url + "/random" + random + "?" + userInput;
        } else if(query == "users"){

            url = photo.all().fromUser(userInput).fetch();

        } else if(query == "collections"){

            /*  Weird... there seems to be no method in the API for getting an image from a collection.
                I will resort to using a hardcoded string url instead... */
            console.log(userInput);
            if (userInput == "")
                userInput = random;

            url = "https://source.unsplash.com/collection/" + userInput;
        }



        setTimeout(function(){
            container = document.createElement('LI');
            container.setAttribute('class', 'imagelist__item animated zoomIn');
            img = document.createElement('IMG');
            img.setAttribute('src', url);
            img.setAttribute('class', 'imagelist__image');
            document.getElementById('imagelist').appendChild(container).appendChild(img);

            fetchPhotos(amount - 1);

        }, 100);
    }

    clearList();
    fetchPhotos(20);
}

window.onload = function(){
    userSearch()
}
