const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')

const users = require("./routes/api/users");

let bundler = new Bundler('./client/src/index.html')
let app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
// app.use("/api/users", users);

// app.use(
//   '/api',
//   proxy({
//     target: 'http://localhost:5000'
//   })
// )

let bundlerMiddleware = bundler.middleware();

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) next();
  else bundlerMiddleware(req, res, next);
})

// const port = process.env.PORT || 1234;

// app.listen(Number(port), () => console.log(`Server up and running on port ${port} !`));
