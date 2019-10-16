module.exports = () => {
  return (req, res, next) => {
    const xApiKey = req.headers["x-api-key"];
    const { API_KEY } = process.env;
    if (xApiKey && xApiKey.length !== "undefined") {
      if (xApiKey !== API_KEY) {
        return res.status(401).json({ message: "API Key is incorrect" });
      }
      next();
      return;
    }
    return res.status(401).json({ message: "API Key is required" });
  };
};
