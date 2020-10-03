const mongoose = require('mongoose');
const moment = require('moment');
const { Schema: { Types: { ObjectId }}} = mongoose;

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },

    post: {
        type: ObjectId,
        ref: "post"
    },

    creator: {
        type: ObjectId,
        ref: "user"
    },

    creatorName: {
        type: String
    },

    createdAt: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    }
    
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;