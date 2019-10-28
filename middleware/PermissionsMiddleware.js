module.exports = function(option) {
  return (req, res, next) => {
    const { user } = req;
    if (user && option in user) {
      if (user[option]) {
        next();
      } else {
        res.send({ message: "You do not have the correct permissions" });
      }
    }
  };
};
