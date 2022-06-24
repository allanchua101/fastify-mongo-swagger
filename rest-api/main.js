const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");
const { connectSwagger } = require("./connectors/swagger-connector");
const { connectMongo } = require("./connectors/mongodb-connector");
const { plugJwtSystem } = require("./connectors/jwt-connector");
const { handleDefaultRoute } = require("./routes/root");
const { getUsers } = require("./routes/users/get-list");
const { createUser } = require("./routes/users/create");
const { updateUser } = require("./routes/users/update");
const { removeUser } = require("./routes/users/delete");
const { getUser } = require("./routes/users/get-by-id");
const { login } = require("./routes/users/login");

const start = async () => {
  try {
    dotenv.config();

    await connectSwagger(fastify);
    await connectMongo(fastify);
    await plugJwtSystem(fastify);

    fastify.addHook("onRequest", async (request, reply) => {
      try {
        const publicEndpoints = ["/", "/login"];

        // TODO: Skip validation of public paths
        if (publicEndpoints.indexOf(request.routerPath) > -1) {
          return;
        }

        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });

    fastify.get("/", handleDefaultRoute);
    fastify.post("/login", async (req, rep) => await login(fastify, req, rep));
    fastify.get("/users", getUsers);
    fastify.get("/user", getUser);
    fastify.post("/user/create", createUser);
    fastify.patch("/user/update", updateUser);
    fastify.post("/user/delete", removeUser);
    fastify.swagger();

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
