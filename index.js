const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", (req, res) => {
  res.send("POST request to the homepage");
  console.log(req);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
