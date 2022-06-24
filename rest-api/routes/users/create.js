const { respondWith422 } = require("../../http/responder");

module.exports = {
  async createUser(req, rep) {
    if (!req.body) {
      return respondWith422(rep, "Request body is missing");
    }

    const { email, firstName, lastName } = req.body;

    if (!email) {
      return respondWith422(rep, "Email is required");
    }

    if (!firstName) {
      return respondWith422(rep, "First name is required");
    }

    if (!lastName) {
      return respondWith422(rep, "Last name is required");
    }

    const users = this.mongo.db.collection("users");
    const result = await users.insertOne({ email, firstName, lastName });

    return { result };
  },
};
