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

    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {}; // look for an id parameter
            // call MoviesDAO.getMovieById, which will return specific movie in json response
            let movie = await MoviesDAO.apiGetMovieById(id); 

            if(movie) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(movie);
        }
        catch(e) {
            console.log(`api, ${e}`);
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await MoviesDAO.getRatings();
            res.json(propertyTypes);
        }
        catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }
}