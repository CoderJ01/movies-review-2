// useState allows for the the creation of several variables
import React, {useState, useEffect} from 'react';
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// recieves and uses props
const MoviesList = props => {
    // useState hooks create state variables (blue)
    // 2nd and 3rd lines keep track of what user has entered
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");  
    const [searchRating, setSearchRating] = useState("");
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

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    }

    return (
        <div className='App'>
            <Container>
                <Form>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="Search by title"
                                value={searchTitle} // set to searchTitle state variable
                                onChange={onChangeSearchTitle}/>
                        </Form.Group>
                        {/* call findByTitle */}
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByTitle}>
                            Search
                        </Button>      
                    </Col>
                    <Col>
                    <Form.Group>
                        {/* dropdown to select movie rating */}
                        <Form.Control
                            as="select" onChange={onChangeSearchRating}>
                            {ratings.map(rating => {
                                return(
                                    <option value={rating}></option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                    {/* call findByRating */}
                    <Button
                        variant="primary"
                        type="button"
                        onClick={findByRatings}
                    >
                        Search
                    </Button>
                    </Col>
                </Form>
            </Container>
        </div>
    );
}

// function MoviesList() {
// }

export default MoviesList;

