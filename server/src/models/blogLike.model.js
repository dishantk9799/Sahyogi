import mongoose from "mongoose";


const schema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }

});


schema.index(
    {
        userId: 1,
        blogId: 1
    },
    {
        unique: true
    }
);

const BlogLike = mongoose.model("BlogLike", schema);

export default BlogLike;