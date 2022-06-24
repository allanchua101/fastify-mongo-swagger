const { respondWith422, respondWith404 } = require("../../http/responder");

module.exports = {
  async updateUser(req, rep) {
    if (!req.body) {
      return respondWith422(rep, "Request body is missing");
    }

    const { id, email, firstName, lastName } = req.body;

    if (!id) {
      return respondWith422(rep, "ID is required");
    }

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
    const query = { _id: this.mongo.ObjectId(id) };
    const user = await users.findOne(query);

    if (!user) {
      return respondWith404(rep, "User not found.");
    }

    const updateResult = await users.updateOne(query, {
      $set: {
        email,
        firstName,
        lastName,
      },
    });

    return { updateResult };
  },
};
