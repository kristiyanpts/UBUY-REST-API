const express = require("express");
const router = express.Router();

const data = {
  name: "Back-End REST API",
  version: "1.0.0",
  description:
    "REST API for Back-End of UBUY (React Project by Kristiyan Petsanov)",
  main: "index.js",
};

router.get("/", function (req, res) {
  res.send(data);
});

module.exports = router;
