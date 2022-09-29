const express = require("express");
const app = express();
const { resolve } = require("path");
const public = require("./modules/public");
const { port, callback } = require("./modules/port");
const method = require("method-override");
const upload = require("./modules/upload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const ageCheckMiddleware = require("./middlewares/ageCheckMiddleware");
const { ageCheck, ageRedirect } = require("./controllers/main.controller");
const userMiddleware = require("./middlewares/usersMiddleware");

app.listen(port, callback);

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // req.body y el req.query
app.use(express.json());
app.use(method("m")); // En la url poner ?m=PUT o ?m=DELETE

app.use(
  session({
    secret: "CavaWines",
    saveUninitialized: true,
    resave: true,
  })
); // req.session

app.use(cookieParser());

app.use(public); //Public static
app.use(upload); //Upload static

app.get("/agecheck", ageCheck);
app.post("/agecheck", ageRedirect);

app.use(userMiddleware);

app.use("/api/users", require("./routes/apis/usersApis.routes")); //Se puso antes del ageCheck porque sino redirige
//Colocar acá el api products

app.use(ageCheckMiddleware); //Middleware de chequeo de edad
app.use(require("./routes/main.routes"));

app.use("/products", require("./routes/products.routes"));
app.use("/users", require("./routes/users.routes"));
