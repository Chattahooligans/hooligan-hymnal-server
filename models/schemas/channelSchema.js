const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const { ObjectId } = mongoose.Schema.Types;

// Note to self: https://stackoverflow.com/questions/45952928/mongodb-error-document-must-have-an-id-before-saving
/*
If you have declared _id field explicitly in schema, you must initialize it explicitly
If you have not declared it in schema, MongoDB will declare and initialize it.
*/

module.exports = new mongoose.Schema(
  {
    name: String,
    defaultLocale: String,
    description: String,
    avatarUrl: String,
    headerUrl: String,
    follow: Boolean,
    active: Boolean,
    users: [
      {
        _id: ObjectId,
        canCreate: Boolean,
        canEdit: Boolean,
        canDelete: Boolean,
        canPush: Boolean,
      },
    ],
  },
  {
    strict: false,
    timestamps: true,
  },
);
