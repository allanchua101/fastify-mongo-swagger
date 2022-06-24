const { respondWith422, respondWith404 } = require("../../http/responder");

module.exports = {
  async getUser(req, rep) {
    const { id } = req.query;

    if (!id) {
      return respondWith422(rep, "ID is required");
    }

    const users = this.mongo.db.collection("users");
    const query = { _id: this.mongo.ObjectId(id) };
    const user = await users.findOne(query);

    if (!user) {
      return respondWith404(rep, "User not found.");
    }

    return { user };
  },
};
