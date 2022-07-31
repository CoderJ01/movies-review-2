import mongodb from 'mongodb'; // import to get access to ObjectId to convert to string
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        }
        catch(e) {
            console.error(`unable to establish connection handle in reviewDAO: ${e}`);
        }
    }

    // add review
    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: Object(movieId)
            }
            return await reviews.insertOne(reviewDoc);
        }
        catch(e) {
            console.error(`unable to post review: ${e}`);
            return { error: e }
        }
    }
}