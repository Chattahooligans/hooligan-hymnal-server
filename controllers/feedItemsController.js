const mongoose = require("mongoose");
const FeedItem = mongoose.model("feedItem");
const User = mongoose.model("User");
const Channel = mongoose.model("channels");

exports.index = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;
  const text = req.query.text || '';

  // const feedItems = await FeedItem.find({}).sort({"createdAt": "desc"});
  const query = {
    text: {
      $regex: `.*${text}.*`,
      $options: 'i'
    }
  }
  const feedItemsPromise = await FeedItem
                            .find(query)
                            .skip(skip)
                            .limit(limit)
                            .sort({
                              createdAt: "desc"
                            });
  const countPromise = FeedItem.countDocuments();
  const searchCountPromise = FeedItem.find(query).countDocuments();
  const [feedItems, totalCount, searchCount] = await Promise.all([feedItemsPromise, countPromise]);
  const pages = Math.ceil(totalCount / limit);
  if (!feedItems.length && skip) {
    req.flash("error", `Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
    return res.redirect(`/feed-items?page=${pages}`);
  }

  return res.render("feeditems/index", {
    title: "All Feed Items",
    feedItems,
    totalCount,
    searchCount,
    skip,
    page,
    pages,
    text
  });
};

exports.search = async (req, res) => {
  const text = req.query.text || '';
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;

  const query = {
    text: {
      $regex: `.*${text}.*`,
      $options: 'i'
    }
  }

  const feedItemsPromise = FeedItem.find(query).skip(skip).limit(limit).sort({createdAt: "desc"});
  const totalCountPromise = FeedItem.countDocuments();
  const searchCountPromise = FeedItem.find(query).countDocuments();
  const [feedItems, totalCount, searchCount] = await Promise.all([feedItemsPromise, totalCountPromise, searchCountPromise])
  const pages = Math.ceil(searchCount / limit);

  res.render('feeditems/_feedItemsList', {
    feedItems,
    text,
    skip,
    page,
    pages,
    totalCount,
    searchCount
  })
}

exports.create = (req, res) => {
  res.send("Keep this only on API?");
};
exports.store = async (req, res) => {
  res.send("This is only on api");
};
exports.show = async (req, res) => {
  const feedItem = await FeedItem.findById(req.params.id);
  const senderPromise = User.findOne({ _id: feedItem.sender.user });
  const channelPromise = Channel.findById(feedItem.channel);
  const [sender, channel] = await Promise.all([senderPromise, channelPromise]);
  const feedItemTitle = feedItem.text.slice(0, 15) + "...";

  res.render("feeditems/show", {
    title: `Single Notification: ${feedItemTitle}`,
    feedItem,
    sender,
    channel,
  });
};
exports.edit = async (req, res) => {
  res.send("Edit on notifications controller.");
};
exports.update = async (req, res) => {
  res.send("Update on notifications controller");
};
exports.deleteConfirm = async (req, res) => {
  const feedItem = await FeedItem.findById(req.params.id);
  const feedItemTitle = feedItem.text.slice(0, 15) + "...";
  res.render("feeditems/delete", {
    title: `Delete Notification: ${feedItemTitle}`,
    feedItem
  });
};
exports.delete = async (req, res) => {
  const feedItem = await FeedItem.findByIdAndDelete(req.params.id);
  const feedItemTitle = feedItem.text.slice(0, 15) + "...";
  req.flash("success", `Notification: ${feedItemTitle} was deleted!`);
  res.redirect("/feed-items");
};
