import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            // get info from request's body parameter
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date();

            // send infomation to ReviewsDAO.addReview
            const ReviewResponse = await ReviewsDAO.addReviews(
                movieId,
                userInfo,
                review,
                date
            );
            // send success message if post works
            res.json({ status: "success" });
        }
        catch(e) {
            // send error message if post does not work
            res.status(500).json({ error: e.message });
        }
    }
}