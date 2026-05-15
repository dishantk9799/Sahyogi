import mongoose from "mongoose";


const followSchema = new mongoose.Schema({

    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});


followSchema.index(

    {
        followerId: 1,
        followingId: 1
    },

    {
        unique: true
    }

);


const Follow = mongoose.model("Follow", followSchema);

export default Follow;