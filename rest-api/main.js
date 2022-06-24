const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");
const { connectSwagger } = require("./connectors/swagger-connector");
const { connectMongo } = require("./connectors/mongodb-connector");
const { handleDefaultRoute } = require("./routes/root");
const { getUsers } = require("./routes/users/get-list");
const { createUser } = require("./routes/users/create");
const { updateUser } = require("./routes/users/update");
const { removeUser } = require("./routes/users/delete");
const { getUser } = require("./routes/users/get-by-id");

const start = async () => {
  try {
    dotenv.config();

    await connectSwagger(fastify);
    await connectMongo(fastify);

    fastify.get("/", handleDefaultRoute);
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
