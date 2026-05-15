import mongoose from "mongoose";


const schema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }

});


schema.index(
    {
        userId: 1,
        projectId: 1
    },
    {
        unique: true
    }
);

const SavedProject = mongoose.model("SavedProject", schema);

export default SavedProject;