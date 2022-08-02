import React, {useState, useEffect} from 'react';
import MovieDataService from '../service/movies';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Media from 'react-bootstrap/Media';

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
            <Container>
                <Row>
                    {/* movie poster */}
                    <Col>
                        <Image src={movie.poster+ "/100px250"} fluid />
                    </Col>
                    {/* movie details */}
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {props.user && 
                                <Link to={"/movies/" + props.match.params.id + "/review"}>
                                    Add Review
                                </Link>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Movie;