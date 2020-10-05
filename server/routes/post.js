const express = require('express');
const { Router } = require('express');
const router = Router();
const Post = require('../models/post');
const Category = require('../models/category');
const User = require('../models/user');
const Comment = require('../models/comment');
const { verifyToken } = require('../middlewares/auth');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const AWS = require('aws-sdk');
const config = require('../config');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = config;
const moment = require('moment');

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
})

const uploadS3 = multer({
    storage: multerS3({
        s3,
        bucket: 'blong/uploads',
        region: 'ap-northeast-2',
        key(req, file, cb) {
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, ext);
            cb(null, baseName + new Date().valueOf() + ext);
        }
    }),
    limits: { filesize: 5 * 1024 * 1024 }
});

router.get('/:id', async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id).populate('creator', 'name').populate('category', 'categoryName');
        post.views += 1;
        post.save();
        console.log(post);
        res.status(200).json(post);
    }
    catch(e){
        console.error(e);
        next(e);
    } 
});

router.post('/image', uploadS3.array('upload', 5), async(req, res, next) => {
    try{
        console.log(req.files.map((v) => (v.location)));
        res.json({ uploaded: true, url: req.files.map((v) => (v.location))});
    }
    catch(e){
        console.error(e);
        res.json({ uploaded: false, url: null});
    }
})


//@route POST /post
//@desc Create a post
//@access Private

router.post('/', verifyToken, uploadS3.none(), async (req, res, next) => {
    try{
        const { title, content, fileUrl, creator, category } = req.body;
        const newPost = await Post.create({
            title,
            content,
            fileUrl,
            creator: req.user.id,
            createdAt: moment().format('YYYY-MM-DD hh:mm:ss')
        });
        console.log(newPost);

        const foundCategory = await Category.findOne({
            categoryName: category
        });
        console.log(foundCategory);
        
        if(!foundCategory){
            const newCategory = await Category.create({
                categoryName: category
            });

            await Post.findByIdAndUpdate(newPost._id, {
                $push: { category: newCategory._id }
            });
            await Category.findByIdAndUpdate(newCategory._id, {
                $push: { posts: newPost._id}
            })
            
        }
        else{
            await Category.findByIdAndUpdate(foundCategory._id, {
                $push: { posts: newPost._id}
            });

            await Post.findByIdAndUpdate(newPost._id, {
                $push: { category: foundCategory._id }
            });
        }

        await User.findByIdAndUpdate(req.user.id, {
            $push: { posts: newPost._id }
        });
        
        return res.redirect(`/post/${newPost._id}`);
    }
    catch(error){
        console.error(error);
    }
});

router.get('/:id/comments', async(req, res, next) => {
    try{
        const result = await Post.findById(req.params.id).populate({path: 'comments'});
        console.log(result.comments, "comments from server");
        res.status(200).json(result.comments);
    }
    catch(e){
        console.error(e);
        res.json(e);
    }
});

router.post('/:id/comment', async(req, res, next) => {
    const { content, userId, userName } = req.body;
    const postId = req.params.id;

    try{
        const newComment = await Comment.create({
            content,
            creator: userId,
            creatorName: userName,
            post: postId 
        });

        console.log(newComment, "A new comment");

        await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: newComment._id
            }
        });

        await User.findByIdAndUpdate(userId, {
            $push: {
                comments: {
                    post_id: postId,
                    comment_id: newComment._id
                }
            }
        });

        res.json(newComment);
    }
    catch(e){
        console.error(e);
        res.json(e);
        next(e);
    }
})

// @route   DELETE /post/:id
// @desc    Delete a post
// @access  Private

router.delete('/:id', async(req, res, next) => {
    try{
        await Post.deleteMany({ _id: req.params.id });
        await Comment.deleteMany( { post: req.params.id });
        await User.findByIdAndUpdate(req.body.id, {
            $pull: {
                posts: req.params.id,
                comments: { post_id : req.params.id }
            }
        });

        const categoryUpdateResult = await Category.findOneAndUpdate(
            { posts: req.params.id },
            { $pull: { posts: req.params.id }},
            { new : true }
        )

        if(categoryUpdateResult.posts.length === 0){
            await Category.deleteMany({_id: categoryUpdateResult})
        }
        return res.json({ success: true });
    }
    catch(e){
        console.error(e);
        res.json(e);
        next(e);
    }
})

// @route   GET
module.exports = router;

