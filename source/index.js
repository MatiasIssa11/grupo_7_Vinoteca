const express = require("express");
const app = express();
const { resolve } = require("path");
const public = require("./modules/public");
const { port, callback } = require("./modules/port");
const method = require('method-override');

app.listen(port, callback);

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(public);
app.use(require("./routes/main.routes"));

app.use(require("./routes/products.routes"));
app.use(require("./routes/users.routes"));

/*
app.use("/products", require("./routes/products.routes"));
app.use("/users", require("./routes/users.routes"));
*/

//Agregado sprint4//

app.use(express.urlencoded({extended:false})); // req.body y el req.query
app.use(express.json());
app.use(method('m')); // En la url poner ?m=DELETE