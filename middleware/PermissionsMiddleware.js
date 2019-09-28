module.exports = function(options) {
  return (req, res, next) => {
    const { user } = req;
    if (user) {
      if (options in user) {
        next();
      } else {
        res.send({ message: "You do not have the correct permissions" });
      }
    }
  };
};
