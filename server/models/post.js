const mongoose = require('mongoose');
const moment = require('moment');
const { Schema: { Types: { ObjectId }}} = mongoose;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },

    content: {
        type: String,
        required: true
    },

    views: {
        type: Number,
        default: -2
    },

    fileUrl: {
        type: String,
        default: "https://source.unsplash.com/random/301x201"
    },

    category: {
        type: ObjectId,
        ref: "category"
    },

    comments: [
        {
            type: ObjectId,
            ref: "post"
        }
    ],

    creator: {
        type: ObjectId,
        ref: 'user'
    },

    createdAt: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    }
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;