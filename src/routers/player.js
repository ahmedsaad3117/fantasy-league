const express = require("express");
const playersRouter = new express.Router();
const playerContoler = require("../controllers/playerControler");

playersRouter
  .route("/player")
  .post(playerContoler.createPlayer)
  .get(playerContoler.getAllPlayers);

playersRouter
  .route("/player/:id")
  .patch(playerContoler.updatePlayer)
  .delete(playerContoler.deletePlayer);


module.exports = playersRouter;
