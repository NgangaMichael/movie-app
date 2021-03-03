// declare the form  as a variable and call  
const form = document.querySelector("#search")
// add a submit event to the form 
form.addEventListener("submit", async(event)=>{
    // this prevents the form from submiting automatically
    try { 
    event.preventDefault();
    const search = form.elements.query.value;
    const config = {params: {t: search}}
    let key = "fa58b78e"
    const res = await axios.get("http://www.omdbapi.com/?apikey="+key, config)
    console.log(res.data)

    // create variables where the images and details of the movie will be stored 
    const moviePic = document.querySelector(".movieImage")
    const details = document.querySelector(".details")
    const image = document.createElement("img")
    const backImg = document.querySelector("#backImg")
    const errDisplay = document.querySelector(".errDisplay")
    // this removes the background image of the container in submit 
    backImg.classList.remove("bacImg")
    image.src = res.data.Poster
    // this removes the previous results as you submit new results 
    moviePic.innerHTML = "";
    details.innerHTML = "";
    moviePic.append(image);
    
    // create a textNode that will fetch the details of the movie and display in html 
    let title = document.createTextNode(res.data.Title); 
    details.append(title);
     let year = document.createTextNode(res.data.Year); 
    details.append(year);
     let type = document.createTextNode(res.data.Genre); 
    details.append(type);
     let date = document.createTextNode(res.data.Released); 
    details.append(date);
     let language = document.createTextNode(res.data.Language); 
    details.append(language);
     let plot = document.createTextNode(res.data.Plot); 
    details.append(plot);
    
    // catch the errors when nothing is searched and when the movie searched is not in the database 
    // if(! form.elements.query.value) console.log("Nothing searched nothing found")
    function notFound(){
        if(res.data.Response === "False"){
        console.log("Movie not found")
        moviePic.remove()
        details.remove()
        errDisplay.append("Movie not found")
    }
    }
    notFound()
    
    // remove the input after submit 
    form.elements.query.value = "";
    } catch (err){
       
    }
});