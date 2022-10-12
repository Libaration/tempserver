const express = require("express");
const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.send("Hello World!");
});
app.post("/api", (req, res) => {
  res.send("POST request to the homepage");
  console.log(req);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
