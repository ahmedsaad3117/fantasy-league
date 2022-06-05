const express = require("express");
const mongoose = require("mongoose");

const router = new express.Router();

router.delete("/deleteAll", (req, resp) => {
  mongoose.connection.db.dropDatabase(() => {
    resp.send("Deleted..");
  });
});

module.exports = router;
