import React, {useState, useEffect} from 'react';
import MovieDataService from '../service/movies';
import { Link } from 'react-router-dom';

const Movie = props => {

    // hold specific movie being shown
    const [movie, setMovie] = useState({
        id: '',
        title: "",
        rated: "",
        reviews:[]
    });

    // call MovieDataService.get()
    const getMovie = id => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    // call getMovie
    useEffect(() => {
        getMovie(props.match.params.id)
    }, [props.match.params.id] /* avoid calling multiple times for same movie*/)

    return (
        <div>
        </div>
    );
}

export default Movie;