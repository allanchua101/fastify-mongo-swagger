const { respondWith422 } = require("../../http/responder");

module.exports = {
  async login(fastify, req, rep) {
    if (!req.body) {
      return respondWith422(rep, "Invalid credentials");
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return respondWith422(rep, "Invalid credentials");
    }

    if (
      username !== process.env.SERVER_USERNAME &&
      password !== process.env.SERVER_PASSWORD
    ) {
      return respondWith422(rep, "Invalid credentials");
    }

    const token = fastify.jwt.sign({
      username: process.env.SERVER_USERNAME,
      password: process.env.SERVER_PASSWORD,
      expiry: "Jun 20, 2022", // NOTE: This should be dynamic in a real application,
      ipAddress: "Add user IP here to prevent JWT hijacking",
    });

    rep.send({ token });
  },
};
