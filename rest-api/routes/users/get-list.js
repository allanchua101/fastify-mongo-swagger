module.exports = {
  async getUsers(req, rep) {
    const users = this.mongo.db.collection("users");
    const results = await users.find({}).toArray();

    return { results };
  },
};
