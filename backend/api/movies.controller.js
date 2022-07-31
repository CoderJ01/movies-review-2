import MoviesDAO from '../dao/moviesDAO.js'; // import DAO

export default class MoviesController {
    // apiGetMovies, query string will be in response object
    static async apiGetMovies(req, res, next) {
        // check if moviesPerPage exists
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0; // if it exist, parse it into an integer

        let filters = {}
        if(req.query.rated) {
            filters.rated = req.query.rated;
        }
        else if(req.query.title) {
            filters.title = req.query.title;
        }

        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
            filters,
            page, 
            moviesPerPage
        });

        // send JSON response
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        }
        res.json(response);
    }
}