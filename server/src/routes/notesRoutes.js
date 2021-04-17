const express = require("express");
const NotesModel = require("../models/NotesModel");
const fetch = require("node-fetch");

const router = express.Router();

// Add router to ensure user is logged in

// GET - load page

// POST - create page
router.post("/new-note", (req, res) => {
  const newNote = req.body;
  console.log("newNote: ", newNote);
  NotesModel.create(newNote).then((data) => {
    console.log(data);
    res.send(data);
  });
});

// PUT - update content

// DELETE - delete content

// GET - search inside page

module.exports = router;
