let movies; // stores reference to the database

export default class MoviesDAO {
    // inject db called as soon as server starts and provides database reference to movies
    static async injectDB(conn) {
        if(movies) {
            return;
        }
        // return if reference exists
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies');
        }
        // send error if refernce can't be retrieved
        catch(e) {
            console.log(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    // accepts a filter object as an argument
    static async getMovies({ // default filter
        filters = null,
        page = 0,
        moviesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query;
        
        if(filters) {
            if("title" in filters) {
                query = { $text: { $search: filters['title']}}
            }
            else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated']}}
            }
        }

        let cursor;
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return {moviesList, totalNumMovies}
        }
        catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return { moviesList: [], totalNumMovies: 0}
        }
    }

    static async getRatings() {
        let ratings = [];
        try {
            ratings = await movies.distinct("rated");
            return ratings;
        }
        catch(e) {
            console.error(`unable to get ratings, ${e}`);
        }
    }
}