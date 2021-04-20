const mongoose = require("mongoose");
// const MUUID = require("uuid-mongodb");

const pageSchema = mongoose.Schema({
  documentId: String,
  documentTitle: String,
  documentContent: Object,
});

module.exports = mongoose.model("pages", pageSchema);
