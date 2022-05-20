
document.querySelector('form').addEventListener('submit',()=>{searchFn(document.querySelector('#movieSearch').value)});

    function searchFn(title){
        event.preventDefault();
        document.getElementById('movies').remove();
        document.querySelector('#card-container').innerHTML="";
        
        const response=fetch(`https://www.omdbapi.com/?t=${title}&apikey=c82dc22a`);
       response.then((response2)=>{
           console.log(response2);
           return response2.json();
       }).then((result)=>{
           console.log(result);
        if(result.Response=="True"){
            var card=document.createElement('div');
            card.setAttribute('id','card');
            var imageContainer=document.createElement('div');
            imageContainer.setAttribute('id','imageContainer');
            var OuterDescription=document.createElement('div');
            OuterDescription.setAttribute('id','OuterDescription');
            var description=document.createElement('div');
            description.setAttribute('id','description');
            OuterDescription.append(description);
            card.append(imageContainer,OuterDescription);
            var image=document.createElement('img');
        image.src=result.Poster;
        var name=document.createElement('h3');
        var rating=document.createElement('h3');
        rating.innerText=result.imdbRating;
        var nameBox=document.createElement('div');
        nameBox.append(name,rating);
        nameBox.setAttribute('class','box');
        name.innerText=result.Title;
        var box=document.createElement('div');
        box.setAttribute('class','box');
        var year=document.createElement('p');
        var duration=document.createElement('p');
        var genre=document.createElement('p');
       
        
        year.innerText=result.Released;
        duration.innerText=result.Runtime;
        genre.innerText=result.Genre;
        box.append(year,duration,genre);
        var actors=document.createElement('h4');
        actors.innerText="Actors: "+result.Actors;
        actors.style.marginTop="50px";
        var plot=document.createElement('p');
        plot.innerText="Plot: "+result.Plot;
        plot.style.marginTop="70px";
        description.append(nameBox,box,actors,plot);
        if(result.imdbRating>8.9){
            recommended=document.createElement('div');
            recommended.innerText="Recommended";
            recommended.setAttribute('id','recommend');
            description.append(recommended);
        }
       
        imageContainer.append(image);
        document.querySelector('#card-container').append(card);
        description.style.margin = "20px";
        }else{
            document.querySelector('#card-container').innerHTML="";
            var image=document.createElement('img');
            image.src="https://cdn.dribbble.com/users/88213/screenshots/8560585/media/7263b7aaa8077a322b0f12a7cd7c7404.png";
            document.querySelector('#card-container').append(image);
        }
    });
    }
    let realDebounce=debounce(displaySearchResults,1000);
    document.querySelector('#movieSearch').addEventListener('input',realDebounce);
   
    
    function debounce(func,delay){
        
        let timerId;
        return function(){
            if(timerId)
        clearTimeout(timerId);
        timerId=setTimeout(func,delay);
        }
    }
    async function displaySearchResults(){

        let movie=document.createElement('div');
        movie.setAttribute('id',"movies");
        
        let search = document.getElementById("movieSearch").value;
        
        let res = await fetch(`https://www.omdbapi.com/?&apikey=c82dc22a&s=${search}`) ;

        let data= await res.json();
        
        console.log(data);
        if(data.Search==undefined){
            document.getElementById('movies').remove();
            
        }
        data.Search.forEach((element)=>{
            
            let smallCard=document.createElement('div');
            let image=document.createElement('img');
            image.src=element.Poster;
            let title=document.createElement('h4');
            title.innerText=element.Title;
            smallCard.append(image,title);
            movie.append(smallCard);
            document.querySelector('body').append(movie);

            smallCard.addEventListener('click',()=>{
                searchFn(element.Title);
            })
        })
        
        
    }
    