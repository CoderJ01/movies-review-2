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
}