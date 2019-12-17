const mongoose = require("mongoose");
const Songbook = mongoose.model("songbook");

exports.index = async (req, res) => {
  const songbooks = await Songbook.find({});
  res.render("songbooks/index", {
    title: "All Songbooks",
    songbooks
  });
};
exports.create = (req, res) => {
  res.render("songbooks/create", {
    title: "Create Songbook"
  });
};
exports.store = async (req, res) => {
  const songbook = new Songbook(req.body);
  await songbook.save();
  req.flash("success", `${songbook.songbook_title} was created`);
  res.redirect("/songbooks");
};
exports.show = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render("songbooks/show", {
    title: `${songbook.songbook_title}`,
    songbook
  });
};
exports.edit = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render("songbooks/edit", {
    title: `Edit ${songbook.songbook_title}`,
    songbook
  });
};
exports.update = async (req, res) => {
  const updates = {};
  const songbook = await Songbook.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: updates
    },
    {
      new: true,
      runValidators: true,
      context: "query"
    }
  );
  req.flash("success", `${songbook.songbook_title} was updated!`);
  res.redirect("back");
};
exports.deleteConfirm = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render("songbooks/delete", {
    title: `Delete ${songbook.songbook_title}`,
    songbook
  });
};
exports.delete = async (req, res) => {
  const songbook = await Songbook.findByIdAndDelete(req.params.id);
  req.flash("success", `${songbook.songbook_title} was deleted!`);
  res.redirect("/songbooks");
};

exports.addChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.id);
  res.render("songbooks/addChapter", {
    title: `Add Chapter to ${songbook.songbook_title}`,
    songbook
  });
};

exports.saveChapter = async (req, res) => {
  let newChapter = {
    chapter_title: req.body.chapter_title,
    songs: []
  };
  const songbook = await Songbook.findById(req.params.id);
  songbook.chapters.push(newChapter);
  await songbook.save();
  req.flash(
    "success",
    `${newChapter.chapter_title} was added to ${songbook.songbook_title}`
  );
  res.redirect(`/songbooks/${songbook._id}`);
};

exports.deleteChapterConfirm = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.chapterId);
  res.render("songbooks/deleteChapter", {
    title: `Delete ${chapter.chapter_title} Confirm`,
    songbook,
    chapter
  });
};

exports.deleteChapter = async (req, res) => {
  const songbook = await Songbook.findById(req.params.songbookId);
  const chapter = await songbook.chapters.id(req.params.id);
  songbook.chapters.remove(chapter.chapter_title);
  await songbook.save();
  req.flash(
    "success",
    `${chapter.chapter_title} was removed from ${songbook.songbook_title}`
  );
  res.redirect(`/songbooks/${songbook._id}`);
};

exports.removeChapterConfirm = async (req, res) => {
  res.send("Implement DELETE Confirm");
};
exports.removeChapter = async (req, res) => {
  res.send("Implement delete/remove chapter");
};
