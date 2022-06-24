module.exports = {
  async connectMongo(fastify) {
    await fastify.register(require("@fastify/mongodb"), {
      forceClose: true,
      url: process.env.MONGO_DB_CONNECTION,
    });
  },
};
