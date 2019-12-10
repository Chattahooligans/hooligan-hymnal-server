exports.loginForm = (req, res) => {
  res.render("auth/login", {
    title: "Login"
  });
};

exports.login = (req, res) => {};
