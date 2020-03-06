const PushTokens = require('../../models/pushTokens');


exports.get = async (req, res) => {
  PushTokens.find((error, pushTokens) => {
    if (error) {
      res.status(501).send({ error });
    }
    res.send(pushTokens);
  });
};

exports.store = async (req, res) => {
  const now = new Date()
    .toISOString()
    .replace(/T/, ' ') // replace T with a space
    .replace(/\..+/, '');
  const tokenData = {
    ...req.body,
    lastUsed: now,
    $inc: { checkinCount: 1 },
  };

  if (!tokenData.hasOwnProperty('expoExperience')) {
    res.status(501).send({
      error: `Error creating or updating push token ${tokenData.pushToken}: You must include an expoExperience.`,
    });
  } else {
    try {
      let acceptedExpoExperience = '';
      if (process.env.EXPO_EXPERIENCE) {
        acceptedExpoExperience = process.env.EXPO_EXPERIENCE || '';
        if (tokenData.expoExperience !== acceptedExpoExperience) {
          console.error(`expoExperience for push token ${tokenData.pushToken}: ${tokenData.expoExperience} is not allowed`)
          return res.status(403).json({
            error: `expoExperience for push token ${tokenData.pushToken}: ${tokenData.expoExperience} is not allowed`,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
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
      setDefaultsOnInsert: true,
    },
    (error, token) => {
      error
        ? res.status(501).send({
          error: `Error creating or updating push token ${tokenData.pushToken}: ${error}`,
        })
        : res.send(token);
    },
  );
};
