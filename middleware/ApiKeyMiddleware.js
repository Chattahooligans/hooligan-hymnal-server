module.exports = () => {
  return (req, res, next) => {
    const {
      key
    } = req.headers;
    return res.send({ key });
    // if (user && option in user) {
    //   if (user[option]) {
    //     next();
    //   } else {
    //     res.send({
    //       message: "You do not have the correct permissions"
    //     });
    //   }
    // }
  };
};
