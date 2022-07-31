import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    // add review
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

    // update review
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review._id;
            const review = req.body.review;

            const date = new Date();

            // call ReviewsDAO.updateReview
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user._id,
                review, 
                date
            );

            var { error } = ReviewResponse;
            if(error) {
                res.status.json({error});
            }

            // ReviewResponse is a document, which contains the number of modified documents
            if(ReviewResponse.modifiedCount === 0) {
                throw new Error ("unable to update review. User may npt be original poster");
            }
            res.json({ status: "success" });
        }
        catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    // delete review
    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            );
            res.json({ status: "success" });
        }
        catch(e) {
            res.status(500).json({ error: e.message });
        }
    }
}