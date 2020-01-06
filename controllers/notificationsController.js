const mongoose = require("mongoose");
const Notification = mongoose.model("notification");

exports.index = async (req, res) => {
  const notifications = await Notification.find({});
  res.render("notifications/index", {
    title: "All Notifications",
    notifications
  });
};
exports.create = (req, res) => {
  res.send("Keep this only on API?");
};
exports.store = async (req, res) => {
  res.send("This is only on api");
};
exports.show = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  res.render("notifications/show", {
    title: `Single Notification: ${notification._id}`,
    notification
  });
};
exports.edit = async (req, res) => {
  res.send("Edit on notifications controller.");
};
exports.update = async (req, res) => {
  res.send("Update on notifications controller");
};
exports.deleteConfirm = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  res.render("notifications/delete", {
    title: `Delete Notification: ${notification._id}`
  });
};
exports.delete = async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  req.flash("success", `Notification: ${notification._id} was deleted!`);
  res.redirect("/notifications");
};
