const mongoose = require('mongoose');
const moment = require('moment');
const { Schema: { Types: { ObjectId }}} = mongoose;

const CategorySchema = new mongoose.Schema({
    categorySchema: {
        type: String,
        default: "no category"
    },

    posts: [
        {
            type: ObjectId,
            ref: "post"
        }
    ],  

    createdAt: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    }
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;