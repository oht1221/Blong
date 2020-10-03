const should = require('should');
const request = require('supertest');
const app = require('./app');
const connectMongo = require('./models');
const Post = require('./models/post');
const User = require('./models/user');

describe('GET /post/:id', () => {
    before((done) => { connectMongo(); done();});
    describe('Success', () => {
        it('returns the post information', (done) => {
            request(app)
                .get('/api/post/5f6ac1af430435290c370f36')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res) {
                    if(err) done(err);
                    else {
                        console.log(res.body);
                        done();
                    }
                });
        });
    });
});

describe('POST /post', () => {
    before(  (done) => {  connectMongo(); done();});
    describe('Success', () => {
        it(`returns the new post's information`, (done) => {
            request(app)
                .post('/api/post')
                .send({
                    title: "title-test",
                    content: "content-test",
                    fileUrl: "fileUrl-test",
                    creator: "creator-test"
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end( async function(err, res) {
                    await Post.deleteOne({ _id: res.body._id });
                    if(err) {
                        done(err);
                    }
                    else {
                        done();
                    }
                });
        });
    });
});

describe('POST /user', () => {
    before((done) => { connectMongo(); done();});
    describe.only('Success', () => {
        it(`returns the new user's information`, (done) => {
            request(app)
                .post('/api/user')
                .send({
                    name: "name-test",
                    email: "email-test@test.com",
                    password: "password-test",
                })
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end( async function(err, res) {
                    await User.deleteOne({ _id: res.body.user.id });
                    if(err) {
                        done(err);
                    }
                    else {
                        done();
                    }
                });
        });
    });
});