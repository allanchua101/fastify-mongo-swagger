module.exports = {
  async connectSwagger(fastify) {
    await fastify.register(require("@fastify/swagger"), {
      routePrefix: "/openapi",
      swagger: {
        info: {
          title: "User management Open API",
          description: "Team documentation for User management system",
          version: "0.1.0",
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
      },
      uiConfig: {
        docExpansion: "full",
        deepLinking: false,
      },
      uiHooks: {
        onRequest: function (request, reply, next) {
          next();
        },
        preHandler: function (request, reply, next) {
          next();
        },
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      exposeRoute: true,
    });
  },
};
