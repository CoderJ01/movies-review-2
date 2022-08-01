// useState allows for the the creation of several variables
import React, {useState, useEffect} from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";

// recieves and uses props
const MoviesList = props => {
    // useState hooks create state variables (blue)
    // 2nd and 3rd lines keep track of what user has entered
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");  
    const [searchRatings, setSearchRatings] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    // performed after rendering
    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    },[])

    // retrieve movies
    const retrieveMovies = () => {
        MovieDataService.getAll()
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
            })
            .catch(e => {
                console.log(e);
            })
    }

    // retrieve ratings
    const retrieveRatings = () => {
        MovieDataService.getRatings()
        .then(response => {
            console.log(response.data);
            // start with 'All ratings' if user doesn't specify any ratings
            setRatings(["All Ratings"].concat(response.data))
            .catch(e => {
                console.log(e);
            });
        })
    }
}

// function MoviesList() {
//     return (
//         <div className='App'>
//             Movies List
//         </div>
//     );
// }

export default MoviesList;