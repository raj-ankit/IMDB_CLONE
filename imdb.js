var searchBar=document.querySelector('#search_bar');
var suggestionList=document.querySelector('#suggestionList');
var button=document.querySelector('#button');
var homePage=document.querySelector('#container');
var watchlist=document.querySelector('#watchlist');

// fetch movie suggestions
function fetchMoviesSuggestion(){
    let searchValue=searchBar.value;
    if(searchValue.length>0){
        $.ajax({
            url:'https://www.omdbapi.com',
            method:'GET',
            data:{
                apikey:'40c57038',
                s:searchValue
            },
            // after successful response from server
            success:function(jsonResponse){
                // console.log(jsonResponse);
                if(jsonResponse.Response=='True'){
                    let movieList=jsonResponse.Search;
                    for(let i=0;i<movieList.length;i++){
                        let movieName=movieList[i].Title;
                        let movieType=movieList[i].Type;
                        let movieRelease=movieList[i].Year;
                        // creating option element 
                        let movieSuggestion=document.createElement('option');
                        // updating value attribute of option element 
                        movieSuggestion.value=movieName;
                        // adding block in option element
                        movieSuggestion.innerHTML=
                            `<div>
                                <p>${movieType}</p>
                                <p>release: ${movieRelease}</p>
                            </div>`
                        // finally appending to its parent element
                        suggestionList.append(movieSuggestion);
                    }
                }
            }
        }).fail(()=>{                                  // if server failed to send response
            alert('Ooops!!! Server Error');
        })
    }
}

// Fetch movie function to show content of searched movie name
function fetchMovie(){
    let movieTitle=searchBar.value;
    if(movieTitle.length>0){
        // homePage.remove();
        $.ajax({
            url:'https://www.omdbapi.com',
            method:'GET',
            data:{
                // using query parameters to API call
                apikey:'40c57038',         // giving API url to API key
                t:movieTitle               // giving movietitle as query to API
            },
            // after successful response from server
            success:function(jsonResponse){
                // console.log(jsonResponse);
                let posterURL=jsonResponse.Poster;
                let movie=jsonResponse.Title;
                let type=jsonResponse.Type;
                let release=jsonResponse.Released;
                let duration=jsonResponse.Runtime;
                let genre=jsonResponse.Genre;
                let director=jsonResponse.Director;
                let cast=jsonResponse.Actors;
                let lang=jsonResponse.Language;
                let country=jsonResponse.Country;
                let awards=jsonResponse.Awards;
                let rating=jsonResponse.imdbRating;
                let votes=jsonResponse.imdbVotes;
                // clearing the movie page section of webpage to show new searched content in place
                homePage.innerHTML='';
                // creating new div element to store content of movie page
                let moviePage=document.createElement('div');
                moviePage.setAttribute('id','movie-page');
                moviePage.innerHTML=`
                <div id="movie-poster">
                    <img src="${posterURL}" alt="poster" style="width: 100%; height: 100%;">
                </div>
                <div id="movie-details">
                    <p><span>Title:</span> ${movie} <i id='favourite' class="fa-solid fa-heart fa-beat"></i></p>
                    <p><span>Type:</span> ${type}</p>
                    <p><span>Release:</span> ${release}</p>
                    <p><span>Runtime:</span> ${duration}</p>
                    <p><span>Genre:</span> ${genre}</p>
                    <p><span>Director:</span> ${director}</p>
                    <p><span>Actors:</span> ${cast}</p>
                    <p><span>Language:</span> ${lang}</p>
                    <p><span>Country:</span> ${country}</p>
                    <p><span>Awards:</span> ${awards}</p>
                    <p><span>imdbRating:</span> ${rating}⭐</p>
                    <p><span>imdbVotes:</span> ${votes}</p>
                </div>`
                homePage.append(moviePage);

                // Adding movies to the watchlist if the favourite icon is pressed
                let favourite=document.querySelector('#favourite'); 
                favourite.addEventListener('click',function(){
                    // function to check whether favourite icon is pressed or not to inhibit same movie addition in watchlist again by clicking favourite icon
                    let iconColor=getComputedStyle(favourite).color;
                    // the movie will be added to the watchlist section only when it has not been inserted already to watchlist
                    // checking for original color of icon
                    if(iconColor=='rgb(39, 163, 157)')
                    {
                        favourite.style.color='red';
                        let watchlistCard=document.createElement('div');
                        watchlistCard.setAttribute('class','watchlist-card');
                        watchlistCard.innerHTML=
                        `<div style="width: 50%; height: 100%;">
                            <img style="width: 100%; height: 100%;" src="${posterURL}" alt="poster">
                        </div>
                        <div class="card-body">
                            <p><span>Title:</span> ${movie}</p>
                            <p><span>Type:</span> ${type}</p>
                            <p><span>Release:</span> ${release}</p>
                            <p><span>Runtime:</span> ${duration}</p>
                            <p><span>Genre:</span> ${genre}</p>
                            <p><span>Language:</span> ${lang}</p>
                        </div>
                    </div>`
                    watchlist.append(watchlistCard);
                } 
                })
            }
        }).fail(()=>{
            alert('Oops!! Server Error')
        });
    }
    // condition when search bar is empty
    else{
        alert("Please select any movie to search🤷‍♂️")
    }
}

// adding keydown event to search bar to get movie suggestions 
searchBar.addEventListener('keydown',function(event){
    let charCode=event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)){   // if only alphabets are pressed then only function will be called
        setTimeout(fetchMoviesSuggestion,100);           // function will be called after each 100 msec so that function to be called after each alphabet pressing
    }
});

// adding click event to play button to fetch movie details
button.addEventListener('click',fetchMovie);
