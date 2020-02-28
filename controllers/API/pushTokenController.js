const PushTokens = require("../../models/pushTokens");


exports.get = async (req, res) => {
  PushTokens.find((error, pushTokens) => {
    if (error) {
      res.status(501).send({ error });
    }
    res.send(pushTokens);
  });
}

exports.store = async (req, res) => {  
  var now = new Date()
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, "");
  var tokenData = Object.assign({}, req.body, {
    lastUsed: now,
    $inc: { checkinCount: 1 }
  });

  if(!tokenData.hasOwnProperty("expoExperience")) {
    res.status(501).send({
      error: `Error creating or updating push token ${tokenData.pushToken}: You must include an expoExperience.`
    })
    return;
  }
  
  PushTokens.findOneAndUpdate(
    { pushToken: tokenData.pushToken },
    tokenData,
    {
      // Return new token if updated (instead of original), create a new
      // record if none exists. There aren't any defaults in the push token
      // schema yet, but in case there ever are, setDefaultsOnInsert is
      // probably the behavior we'd want.
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    },
    (error, token) => {
      error
        ? res.status(501).send({
            error: `Error creating or updating push token ${tokenData.pushToken}: ${error}`
          })
        : res.send(token);
    }
  );
}