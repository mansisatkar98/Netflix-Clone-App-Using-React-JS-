import React, {useEffect, useState} from 'react'
import axios from './axios';
import requests from "./requests";
import './Banner.css';
function Banner() 
{
    const [movie, setMovie] = useState([]);

    useEffect(()=> {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length -1)]  
        ); 
            // [.., .., ..] randomly select one of many
                return request;
        }
        fetchData();
    }, []);

    console.log(movie);
// truncate function to put ... three dots after the description in banner
    function truncate(str,n){
        return str?.length > n ? str.substr(0, n-1)+"..." : str;
    }

  return(
    /* Background image*/
    <header className = "banner"
    style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center-center",
    }}
    >
        <div className = "banner_contents">
         {/* Title */}
         <h1 className="banner_title">
         {movie?.title || movie?.name || movie?.original_name}
         </h1>
         {/* div > 2 buttons */}
         <div className= "banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
         </div>
        {/* description */}
        <h1 className= "banner_description">{movie?.overview} 
        {truncate(movie?.overview, 150)}
        </h1>
        </div>
        <div className="banner--fadeBottom"/>
    </header>
  );
}

export default Banner;
