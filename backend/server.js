import express from 'express'; // import express middleware
import cors from 'cors'; // import cors middleware
import movies from './api/movies.route.js';

const app = express(); // create server

// attach cors and express.json middleware
app.use(cors());
app.use(express.json());

// initial routes
app.use("/api/vl/movies", movies);
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"});
});

export default app; // export app as module so other files can import it