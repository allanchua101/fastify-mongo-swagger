module.exports = {
  async plugJwtSystem(fastify) {
    fastify.register(require("@fastify/jwt"), {
      secret: process.env.JWT_KEY,
    });
  },
};
