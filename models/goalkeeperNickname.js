var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var goalkeeperNicknameSchema = require("./schemas/goalkeeperNicknameSchema");

module.exports = mongoose.model("goalkeeperNickname", goalkeeperNicknameSchema);
