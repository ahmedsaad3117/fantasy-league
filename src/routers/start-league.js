const express = require("express");
const resultRouter = new express.Router();

const leagueUtilsControler = require("../controllers/leagueUtilsControler");

resultRouter.get("/createLeague", leagueUtilsControler.createTeamsAndPlayers);

resultRouter.get("/startLeague", leagueUtilsControler.startLeague)

module.exports = resultRouter;
 