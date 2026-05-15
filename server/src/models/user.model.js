import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        default: ""
    },

    profileImage: {
        type: String,
        default: ""
    },

    bannerImage: {
        type: String,
        default: ""
    },

    skills: [{

        type: String

    }],

    github: {
        type: String,
        default: ""
    },

    linkedin: {
        type: String,
        default: ""
    },

    twitter: {
        type: String,
        default: ""
    },

    portfolio: {
        type: String,
        default: ""
    }

},
    {
        timestamps: true
    }

);


userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            id: this._id,
            email: this.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;
