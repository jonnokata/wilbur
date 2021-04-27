const express = require("express");
const PageModel = require("../models/PageModel");
const fetch = require("node-fetch");

const router = express.Router();

// Add router to ensure user is logged in

// GET - load page
router.get("/load-page", (req, res) => {
  PageModel.find().then((data) => {
    console.log("Load page: ", data);
    res.send(data);
  });
});

// POST - create page - need to accept a document ID here
router.post("/new-page", (req, res) => {
  const newPage = req.body;
  console.log("newPage: ", newPage);
  PageModel.create(newPage).then((data) => {
    console.log(data);
    res.send(data);
  });
});

// PATCH - update content
router.patch("/update-page/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  const updatedPage = await PageModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(updatedPage);
  console.log(res.send);
});

// DELETE - delete page

// GET - search inside page

module.exports = router;

// router.patch("/update/:id", (req, res) => {
//   // which id should I update
//   console.log(req.params.id);

//   // what should the new body for that id look like
//   console.log(req.body);

//   // Success response
//   res.send(
//     `Object with id:${req.params.id} has been changed to ${JSON.stringify(
//       req.body
//     )}`
//   );
// });
