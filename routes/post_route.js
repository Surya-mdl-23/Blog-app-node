const fastify = require("fastify");
const jwt = require('jsonwebtoken')
const postService = require("../services/post_service")

const response = {
    200 : {
        type: 'object',
        properties : {
            message : {type : "string"}
        }
    }
}

const postOpts = {
    schema: {
        body : {
            type: 'object',
            required: ['title', 'content'],
            properties :{
                title : {type : 'string'},
                content : {type : 'string'}
            }
        },
        response: response
}
}

const getPostOpts = {
    schema: {
        response: response
}
}

function postRoutes( fastify, options, done) {
    fastify.post('/addPost', postOpts, async (req, res) => {
        try {
            var user = jwt.verify(req.headers.token, process.env.TOKEN_KEY)
            console.log("user details " + JSON.stringify(user));
        }
        catch (err) {
            console.log("error " + error);
        }
        const postDetails = req.body;
        postDetails.email= user.email;
        const response = await postService.addPost(postDetails);
        res.send(response);

    })

    fastify.get('/getPosts', async (req, res) => {
        try {
            var user = jwt.verify(req.headers.token, process.env.TOKEN_KEY)
            console.log("user details " + JSON.stringify(user));
        }
        catch (err) {
            console.log("error " + error);
        }
        const response = await postService.getPosts();
        res.send(response);
    })
    done();
}

module.exports = postRoutes;