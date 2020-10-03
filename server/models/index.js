const mongoose = require('mongoose');
const config = require('../config');
const { MONGO_URL_OUTSIDE, MONGO_URL } = config;

module.exports = () => {
    
    const connect = async () => {
        if(process.env.NODE_ENV !== 'prod'){
            mongoose.set('debug', true);
        }
    
        try{
            await mongoose.connect(
                MONGO_URL, 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            )
            console.log("MongoDB connection established!");
        }
        catch(e){
            console.log('MongoDB connection failed!');    
            console.error(e) 
        }
        
    }
    
    connect();

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error', error);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.error('MongoDB connection has been disconnected. Tyring to reconnect...');
        connect();
    });

    require('./post');
    require('./user');
    require('./comment');
    require('./category');
};