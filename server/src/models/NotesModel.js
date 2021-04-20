const mongoose = require("mongoose");
// const MUUID = require("uuid-mongodb");

const notesSchema = mongoose.Schema({
  documentId: String,
  documentTitle: String,
  documentContent: Object,
});

module.exports = mongoose.model("notes", notesSchema);
