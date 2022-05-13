const knex = require('../connection')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')


module.exports.signUp = async function (user) {
    const id = uuid.v4();
    const userDuplicate = await knex.table('user').select().where({email : user.email});
    if(userDuplicate.length != 0) {
        return {
            message : "User already registered"
        }
    }
    await knex.table('user').insert({
        id :id,
        name : user.name,
        email: user.email,
        password: user.password
    });

    return {
        message : "User registered successfully"
    }
}


    module.exports.login = async function(userDetails, res) {
        const users =  await knex('user').select().where({email :userDetails.email});
        if(users.length == 0) {
            return {
                message : "User not exists"
            }
        }
        const user = users[0]
        const password = user.password;
        if(password!=(userDetails.password)) {
            res.code(400).send( {
                message : "Incorrect credentials"
            })
        }
        console.log("printing email before generating token " + users.email);
        const token = jwt.sign({id : user.id,
            email: user.email}, process.env.TOKEN_KEY);
            res.header('JWT_TOKEN', token);
            res.send ({
                message : "Logged in"
            });
            
}