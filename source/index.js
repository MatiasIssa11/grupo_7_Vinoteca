const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is running on LocalHost:" + port));

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./views/index.html"))
);
const public = path.resolve(__dirname, "../public");
app.use(express.static(public));
