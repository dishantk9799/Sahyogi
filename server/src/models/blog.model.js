import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    coverImage: {
        type: String,
        default: ""
    },

    content: {
        type: String,
        default: ""
    },

    tags: [{
        type: String
    }],

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},
    {
        timestamps: true
    }

);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;