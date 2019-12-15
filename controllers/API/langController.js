exports.lang = (req, res) => {
  const langs = JSON.parse(process.env.INPUT_LANGUAGES);
  if (langs) {
    res.send({
      langs
    });
    return;
  }
  res.send("INPUT_LANGUAGES not set");
};
