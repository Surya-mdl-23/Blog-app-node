const fastify = require("fastify")({logger:true});
const userRoutes = require('./routes/user_route')
const postRoutes = require('./routes/post_route')
const knex = require('./connection')
const PORT = 5000;
const start = async () => {
    try {
        await fastify.listen(PORT)
    } catch(exception) {
        fastify.log.error(exception);
        process.exit();
    }
}
start()
fastify.register(userRoutes);
fastify.register(postRoutes);
