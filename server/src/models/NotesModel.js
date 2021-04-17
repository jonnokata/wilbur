const mongoose = require("mongoose");
const MUUID = require("uuid-mongodb");

const notesSchema = mongoose.Schema({
  documentId: {
    type: "object",
    value: { type: "Buffer" },
    default: () => MUUID.v4(),
  },
  documentTitle: String,
  documentContent: Object,
  //     userId: {type: 'object',
  //     value: { type: 'Buffer' },
  //     default: () => MUUID.v4(),
  //   },
});

module.exports = mongoose.model("notes", notesSchema);
