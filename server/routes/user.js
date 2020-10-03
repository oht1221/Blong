const express = require('express');
const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({msg: "You have to fill out all the necessary parts."});
        }

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({msg: "A user with the same email address already exists."})
        }
        const newUser = new User({
            name,
            email,
            password
        });

        bcrypt.genSalt(10, async (err, salt) => {
            if(err) throw err;
            try{
                const hash = await bcrypt.hash(newUser.password, salt);
                newUser.password = hash;
                const user = await newUser.save();
                return res.status(200).json({ 
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email 
                    }
                });
            }
            catch(e){
                console.log(e);
                res.status(400).json({msg: e.message});
            }
        });
    }
    catch(e){
        console.error(e);
        res.status(400).json({msg: e.message});
    }
});

module.exports = router;