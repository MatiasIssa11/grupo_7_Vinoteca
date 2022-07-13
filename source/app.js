const express = require("express");
const app = express();
const { resolve } = require("path");
const public = require("./modules/public");
const { port, callback } = require("./modules/port");
const method = require("method-override");
const upload = require("./modules/upload");

app.listen(port, callback);

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); // req.body y el req.query
app.use(express.json());
app.use(method("m")); // En la url poner ?m=PUT o ?m=DELETE

app.use(public);
app.use(upload);

app.use(require("./routes/main.routes"));
app.use("/products", require("./routes/products.routes"));
app.use("/users", require("./routes/users.routes"));
