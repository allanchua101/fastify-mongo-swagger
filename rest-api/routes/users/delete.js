const { respondWith422, respondWith404 } = require("../../http/responder");

module.exports = {
  async removeUser(req, rep) {
    if (!req.body) {
      return respondWith422(rep, "Request body is missing");
    }

    const { id } = req.body;

    if (!id) {
      return respondWith422(rep, "ID is required");
    }

    const users = this.mongo.db.collection("users");
    const query = { _id: this.mongo.ObjectId(id) };
    const user = await users.findOne(query);

    if (!user) {
      return respondWith404(rep, "User not found.");
    }

    await users.deleteOne(query);

    return { isDeleted: true };
  },
};
