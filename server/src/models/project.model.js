import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    thumbnail: {
        type: String,
        default: ""
    },

    techStack: [{
        type: String
    }],

    githubLink: {
        type: String,
        default: ""
    },

    liveLink: {
        type: String,
        default: ""
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},
    {
        timestamps: true
    }

);

const Project = mongoose.model("Project", projectSchema);

export default Project;