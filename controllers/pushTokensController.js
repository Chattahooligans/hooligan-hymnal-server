const mongoose = require("mongoose");
const PushToken = mongoose.model("pushTokens");

exports.index = async (req, res) => {
  const pushTokens = await PushToken.find({});
  res.render("pushTokens/index", {
    title: "Push Tokens",
    pushTokens
  });
};
exports.create = (req, res) => {
  res.send("Create on Push Tokens");
};
exports.store = async (req, res) => {
  res.send("Store on Push Tokens");
};
exports.show = async (req, res) => {
  const pushToken = await PushToken.findById(req.params.id);
  res.render("pushTokens/show", {
    title: `Push Token: ${pushToken._id}`,
    pushToken
  });
};
exports.edit = async (req, res) => {
  res.send("Edit on Push Tokens");
};
exports.update = async (req, res) => {
  res.send("Update on Push Tokens");
};
exports.deleteConfirm = async (req, res) => {
  const pushToken = await pushToken.findById(req.params.id);
  res.render("pushTokens/delete", {
    title: `Delete Push Token: ${pushToken._id}`,
    pushToken
  });
};
exports.delete = async (req, res) => {
  const pushToken = await PushToken.findByIdAndDelete(req.params.id);
  req.flash("success", `Push Token: ${pushToken._id} was deleted`);
  res.redirect("/push-tokens");
};
