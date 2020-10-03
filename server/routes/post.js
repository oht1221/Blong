const express = require('express');
const { Router } = require('express');
const router = Router();
const Post = require('../models/post');
const { verifyToken } = require('../middlewares/auth');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await Post.findOne({ _id: id }, (err, result) => {
            if(err) throw err;
            else{
                console.log(`The post with id ${id} retreived!"`);
                res.json(result);
            }
        });
    }
    catch(e){
        console.error(e);
    } 
});


router.post('/', verifyToken, async (req, res) => {
    try{
        const { title, content, fileUrl, creator } = req.body;
        const newPost = await Post.create({
            title,
            content,
            fileUrl,
            creator
        });
        console.log(newPost);
        res.status(200).json(newPost);
    }
    catch(error){
        console.error(error);
    }
});


module.exports = router;

