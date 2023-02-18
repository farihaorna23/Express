const express = require("express");
//will return a new router instance which is going to allow us to create a route on our app instance
const router = express.Router();

router.get("/", (req, res, next) => {
  //trying to send a file that doesn't exist
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (err) {
    //next will pass the error to the next middleware function to be handled
    next(err);
  }
});

router.get("/about", (req, res, next) => {
  try {
    res.json({ message: "For the about page", query: req.query });
  } catch (err) {
    next(err);
  }
});

//if any error found, send it to the next middleware function (will go to the middleware function that handles server errot\r)
router.post("/signup/:secret", (req, res, next) => {
  try {
    res.json({
      message: `${req.body.name}, Thank You for Signing Up!`,
      secret: req.params.secret
    });
  } catch (err) {
    next(err);
  }
});

//exporting router
module.exports = router;
