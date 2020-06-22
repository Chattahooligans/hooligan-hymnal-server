exports.lang = (req, res) => {
  const langs = process.env.INPUT_LANGUAGES ? JSON.parse(process.env.INPUT_LANGUAGES) : ["en"]
  return res.json({langs: langs})
};
