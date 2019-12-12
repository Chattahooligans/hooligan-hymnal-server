var express = require("express");
var app = express();
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var env = require("dotenv");
var bodyParser = require("body-parser");
var fs = require("fs");
var morgan = require("morgan");
var cors = require("cors");
var passport = require("passport");
var helmet = require("helmet");
var { promisify } = require("es6-promisify");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var fileUpload = require("express-fileupload");
var errorHandlers = require("./handlers/errorHandlers");
var helpers = require("./helpers");

env.config();

const PORT = process.env.PORT || 3000;
var MONGO_URI = process.env.MONGO_URI;

app.use("/assets", express.static(__dirname + "/public"));
// app.use("/", express.static("/service-worker.js"));
// app.use("/", express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

app.set("view engine", "pug");
app.set("views", "views");

mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function() {
      console.log(`Connection has been made`);
    }
  )
  .catch(function(err) {
    console.log(`App starting error:`, err.stack);
    process.exit(1);
  });
mongoose.set("useFindAndModify", false);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

fs.readdirSync("models").forEach(file => {
  if (file.substr(-3) === ".js") {
    require(`./models/${file}`);
  }
});

app.use(passport.initialize());
app.use(passport.session());
require("./handlers/passport");

app.use(flash());

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.flashes = req.flash();
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Autoloads all controllers in directory
fs.readdirSync("controllers/API/").forEach(function(file) {
  if (file.substr(-3) === ".js") {
    const controller = require(`./controllers/API/${file}`);
    if (typeof controller === "function") {
      controller(app);
    }
  }
});
// app.use(serveStatic(__dirname + "/dist"));
const web = require("./routes/web");
app.use("/", web);
// app.use(history("index.html", `${__dirname}/dist/`));
// app.all("*", (req, res) => {
//   res.sendFile(`${__dirname}/dist/index.html`);
// });

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

app.search(errorHandlers.productionErrors);

app.listen(PORT, function() {
  console.log(`app listening on http://localhost:${PORT}`);
});
