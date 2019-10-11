module.exports = () => {
  return (req, res, next) => {
    const {
      api_key
    } = req.headers;
    if (!api_key) {
      return res.status(401).send({ message: "Incorrect API Key" });
    }
    next();
  };
};
