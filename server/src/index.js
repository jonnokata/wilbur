const express = require("express");
const session = require("express-session");

const mongoose = require("mongoose");
const cors = require("cors");

// Connect to mongodb
mongoose.connect(`mongodb://localhost:27017/wilbur`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialise app object
const app = express();
app.use(
  session({
    secret: "This is a random secret example",
    resave: false,
    saveUninitialized: false,
  })
);
// This is the port your application will use
const port = 3000;

// Import all routers
const internalRouter = require("./routes/internalRoutes");
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/notesRoutes");

// Add middleware to be able to read and understand json files
app.use(express.json());
app.use(cors());

// Tell express that it needs to use the routers we have initialised
app.use("/internal", internalRouter);
app.use("/api/user", favouritesRouter);
app.use("/api/notes", stockRouter);

app.listen(port, () =>
  console.log(`Wilbur is listening at http://localhost:${port}`)
);
