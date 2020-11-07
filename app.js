// importing external dependencies
let express = require("express");
let mongoose = require("mongoose");
let helmet = require("helmet");
let logger = require("morgan");
let createError = require("http-errors");
let cors = require("cors");
require("dotenv").config();
// importing internal dependencies
let messageRoute = require("./routes/message");
let contactRoute = require("./routes/contact");
let textRoute = require("./routes/text");
// creating server
let app = express();

// initializing middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(cors()); //middleware to allow cross-origin requests
app.use(express.json()); //express middleware to parse json
app.use(express.urlencoded({ extended: true })); //express middleware to parse url

// mongoDB connection
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGO_URI, (err) => {
  console.log("mongodb connected ?", err ? false : true);
});

//routing middlewares
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/message", messageRoute); 
app.use("/api/v1/text", textRoute); //route to handle sms api calls

// error handlers
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, _req, res, _next) {
  console.log(err, "in error handler");
  res.status(err.status || 500);
  res.json({
    error: err,
  });
});

//  initializing port
let PORT = process.env.PORT || 5000;

// starting server on PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
