module.exports = app => {
  app.get("/api/i18n-settings", (req, res) => {
    return res.send(process.env.INPUT_LANGUAGES);
  });
};
