var mongoose = require("mongoose");
var goalkeeperNicknameSchema = require("./schemas/goalkeeperNicknameSchema");

module.exports = mongoose.model("goalkeeperNickname", goalkeeperNicknameSchema);