const readTime = require("../utils/readTime")
const Post = require("../model/Post.model");



// Get All Published Posts or Search by Title, author or tag
const publishedPosts = async (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    const tag = req.query.tag;
    let sort = req.query.sort
    const { page=1, limit=20 } = req.query;
    try{
        const ValidSort = ['read_count', 'reading_time', 'timestamp'].includes(sort)
        ValidSort ? null : sort = 'read_count'

        let posts;
        
        if(title){
            posts = await Post.find({ title });
        } else if(author){
            posts = await Post.find({ author }).find({ state: "published"}).sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
        } else if(tag){
            posts = await Post.find({
                tags: {
                    $in: [tag],
                },
            }).find({ state: "published" }).sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
        } else {
            posts = await Post.find({ state: "published"}).sort({ [sort]: -1 }).limit(limit*1).skip((page-1)*limit).exec();
            
        }
        const count = await Post.countDocuments();
        res.status(200).json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch(err){
        res.status(500).json({
            error: "Sorry, No published Posts yet!"
        });
    }
}

module.exports = { publishedPosts }