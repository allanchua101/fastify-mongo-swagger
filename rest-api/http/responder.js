module.exports = {
  respondWith422(rep, errorMsg) {
    return rep.code(422).send(new Error(errorMsg));
  },
  respondWith404(rep, errorMsg) {
    return rep.code(404).send(new Error(errorMsg));
  },
};
