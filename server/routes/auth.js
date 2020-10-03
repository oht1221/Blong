const express = require('express');
const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verifyToken } = require('../middlewares/auth');

// @route   POST /auth
// @desc    Auth user
// @access  Public
router.post('/login', async (req, res, next) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ msg: "All fileds need to be filled out."})
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ msg: 'No such user exists!'});
        }
        
        const isMatched = bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(400).json({ msg: 'Password not matched!'});
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "2 days"});
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }

    catch(err){
        console.error(err);
        res.json( { msg: err.message});
    }

});

router.get('/verify', verifyToken, async (req, res) => {
    try{
        const users = await User.findById(req.user.id).select("-password");
        if(users){
            res.status(200).json(users);
        }
        else{
            throw Error("No such user exist!");
        }
    }
    catch(e){
        console.error(e);
        res.status(400).json({msg: e.message});
    }
});

router.use('/logout', (req, res) => {
    res.status(200).json('Logout successfully');
});

module.exports = router;