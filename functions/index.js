const functions = require("firebase-functions");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const port = 3000;

const app = express();

// Import all routers
const internalRouter = require("./routes/internalRoutes");
//const userRouter = require("./routes/userRoutes");
const pageRouter = require("./routes/pageRoutes");
const { resolveSoa } = require("node:dns");

// Add middleware to be able to read and understand json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Tell express that it needs to use the routers we have initialised
app.use("/internal", internalRouter);
app.use("/api/users", userRouter);
app.use("/api/pages", pageRouter);

app.listen(port, () =>
  console.log(`Wilbur is listening at http://localhost:${port}`)
);

exports.app = functions.https.onRequest(app);
