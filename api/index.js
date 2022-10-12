require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");
let bodyToForward;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/forwardToSalesForce", async (req, res) => {
  const r = await fetch(" https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.SECRETKEY}&response=${req.body.token}`,
  });
  const data = await r.json();
  const params = bodyToForward;
  const encoded = [];
  for (let value in params) {
    encoded.push(`${value}=${params[value]}`.replace(" ", "+"));
  }
  if (bodyToForward && data.success) {
    const salesForceR = await fetch(
      "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
      {
        method: "POST",
        headers: {
          Host: "webto.salesforce.com",
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "max-age=0",
          Origin: "https://www.ashlandauction.com",
          Referer: "https://www.ashlandauction.com/",
        },
        body: `${encoded.join("&")}`,
      }
    );
    res.send(data.success);
  } else {
    res.send(false);
  }
});
app.get("/api/redirect", (req, res) => {
  res.redirect("https://www.ashlandauction.com/li-success");
});
app.post("/api", (req, res) => {
  bodyToForward = req.body;
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
