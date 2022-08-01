import axios from "axios";// enables get, post, etc requests to be sent

class MovieDataService {

    // return movies for a particular page
    getAll(page = 0) {
        return axios.get(`http://localhost:5000/api/vl/movies?page=${page}`);
    }

    // get a movie with a specific id
    get(id) {
        return axios.get(`http://localhost:5000/api/vl/movies/id/${id}`);
    }

    // connects to the same endpoint as getAll, except it has a query which consists
    // of user-entered search title, ratings, and page number
    find(query, by = 'title', page='0') {
        return axios.get(
            `http://localhost:5000/api/vl/movies?${by}=${query}&page=${page}`
        );
    }

    createReview(data) {
        return axios.post("http://localhost:5000/api/vl/movies/review", data);
    }

    updateReview(data) {
        return axios.put("http://localhost:5000/api/vl/movies/review", data);
    }

    deleteReview(id, userId) {
        return axios.delete(
            "http://localhost:5000/api/vl/movies/review",
            {data:{review_id: id, user_id: userId}}
        );
    }

    getRatings() {
        return axios.get("http://localhost:5000/api/vl/movies/ratings");
    }
}

export default new MovieDataService();