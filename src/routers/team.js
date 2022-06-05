const express = require("express");
const teamRouter = new express.Router();
const teamControler = require("../controllers/teamControler");
const gamePlay = require("../utils/gamePlay");

const TeamModel = require("../models/teamModel");
teamRouter
  .route("/team")
  .post(teamControler.createTeam)
  .get(teamControler.getAllTeams);
teamRouter
  .route("/team/:id")
  .delete(teamControler.deleteTeam)
  .patch(teamControler.updateTeam);

teamRouter.get("/teamplayers/:name", teamControler.getPlayersTeam );

teamRouter.get("/teampower/:name", teamControler.getTeamPower );



module.exports = teamRouter;
