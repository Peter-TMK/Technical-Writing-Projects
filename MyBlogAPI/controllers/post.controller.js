const readTime = require("../utils/readTime")
const Post = require("../model/Post.model");

// Create Post
const createPost =  async (req, res) => {
    const newPost = new Post(req.body);
    try {
        newPost.reading_time = readTime(newPost.body)
        await newPost.save();
        res.status(200).json({
            message: "Blog created Successfully!",
            newPost
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get Post by ID
const getPost =  async (req, res) => {

        const post = await Post.findById(req.params.id).populate("author");
        // console.log(post)
        if(!post){
            return res.status(404).send('Post not found!')
        }
        post.reading_time = readTime(post.body)
        post.read_count += 1;
        await post.save();

        res.status(200).json(post);
}

// Get All Posts or Search by Title, author or tag
const getAllPosts =  async (req, res) => {
    const title = req.query.title;
    const author = req.query.author;
    const tag = req.query.tag;
    const state = req.query.state;
    const { page=1, limit=20 } = req.query;
    try{
        let posts;
        if(title){
            posts = await Post.find({ title });
        } else if(author){
            posts = await Post.find({ author }).sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
        } else if(state){
            posts = await Post.find({ state }).sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
        } else if(tag){
            posts = await Post.find({
                tags: {
                    $in: [tag],
                },
            }).sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
        } else {
            posts = await Post.find().sort({ _id: -1 }).limit(limit*1).skip((page-1)*limit).exec();
            
        }
        const count = await Post.countDocuments();
        res.status(200).json({
            message: "Successful!",
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch(err){
        res.status(500).json(err);
    }
}

// Update A Post
const updatePost =  async (req, res)=> {
   try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
          $set: req.body
        },
        {new: true}
        );
        res.status(200).json({
            message: "Post has been updated!",
            updatedPost
        });
        } catch (err) {
          res.status(500).json(err);
        }
}

// Delete A Post
const deletePost =  async (req, res)=> {
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost

}