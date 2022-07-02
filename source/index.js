const express = require("express");
const app = express();
const { resolve } = require("path");
const public = require("./modules/public");
const { port, callback } = require("./modules/port");

app.listen(port, callback);

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(require("./routes/main.routes"));
app.use(require("./routes/products.routes"));
app.use(require("./routes/users.routes"));

app.use(public);
