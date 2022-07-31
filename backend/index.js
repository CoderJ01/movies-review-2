import app from './server.js';
import mongodb from "mongodb"; // enable access to database
import dotenv from "dotenv"; // enable access to environmental variables
import MoviesDAO from './dao/moviesDAO.js';

async function main() {
    dotenv.config(); // load varables

    // pass in database URI
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    );
    const port = process.env.PORT || 8000; // retrieve port

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client);

        // start web server
        app.listen(port, () => {
            console.log('server is running on port: ' + port);
        });
    }
    catch(e) {
        console.error(e);
        process.exit(1);
    }
}

// send errors to console
main().catch(console.error);