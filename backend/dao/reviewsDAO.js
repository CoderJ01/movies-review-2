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
}