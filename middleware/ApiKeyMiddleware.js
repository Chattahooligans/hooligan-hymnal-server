module.exports = () => {
  return (req, res, next) => {
    const xApiKey = req.headers["x-api-key"];
    const { API_KEY } = process.env;
    if (xApiKey !== API_KEY) {
      return res.status(401).send({ message: "Incorrect API Key" });
    }
    next();
  };
};
