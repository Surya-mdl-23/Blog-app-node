const knex = require('../connection')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')


module.exports.addPost = async function (postDetails) {
    const id = uuid.v4();
    const users = await knex.table('user').select().where({email : postDetails.email});
    if(users.length == 0) {
        return {
            message : "User not exists"
        }
    }
    const user = users[0];
    await knex.table('post').insert({
        id :id,
        title : postDetails.title,
        content : postDetails.content,
        author: user.name,
    });

    return {
        message : "Posted!.."
    }
}

module.exports.getPosts = async function () {
   return  await knex.table('post').select();
}

