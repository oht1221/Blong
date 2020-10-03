const jwt = require('jsonwebtoken');
const config = require('../config');
const { JWT_SECRET } = config;

exports.verifyToken = (req, res, next) => {

    try{
        const token = req.headers['x-auth-token'];
        if(!token){
            console.error('No token included. Authorization failed!');
            return res.status(401).josn({ msg: "No token included. Authorization failed!"});
        }
        
        req.user = jwt.verify(token, JWT_SECRET);
        return next();
    }
    catch (e){
        if(e.name === 'TokenExpiredError'){
            console.log(e);
            return res.status(419).json({
                code: 419,
                msg: 'The token expired!'
            });
        }
        return res.status(401).json({
            code: 401,
            msg: 'The token is not valid'
        });
    }
}

