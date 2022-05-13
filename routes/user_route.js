const fastify = require("fastify");
const userService = require('../services/user_service')


const response = {
    200 : {
        type: 'object',
        properties : {
            message : {type : "string"}
        }
    }
}
const signupOpts = {
    schema: {
        body : {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties :{
                name : {type : 'string'},
                email : {type : 'string'},
                password : {type : 'string'}
            }
        },
        response: response
}
}

const loginOpts = {
    schema: {
        body : {
            type: 'object',
            required: ['email', 'password'],
            properties :{
                email : {type : 'string'},
                password : {type : 'string'}
            }
        },
        response: response
}
}


function userRoutes(fastify, options, done) {
fastify.post('/signup', signupOpts, async (req, res) => {
    const user = req.body;
    const response = await userService.signUp(user) 
    res.send(response);
});

fastify.post('/login',loginOpts, async (req, res) => {
    const user = req.body;
    const response = await userService.login(user, res) 
})


done();
}

module.exports = userRoutes

