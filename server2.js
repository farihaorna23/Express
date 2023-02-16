const express = require("express");

const app = express();

//this middleware function will run for any http method/request
//and will move to the next middleware
app.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleTimeString());
  next();
});

//middleware function
app.get("/", (req, res) => {
  res.json({ home: "this is home", msg: req.fromMiddleware });
});

app.use((req, res, next) => {
  req.fromMiddleware = "This is top secret";
  next();
});

app.get("/about", (req, res) => {
  res.json({ success: "true", secret: req.fromMiddleware });
});

app.listen(3000, () => console.log("Server running part 2"));
