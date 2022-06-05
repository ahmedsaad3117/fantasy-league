const factory = require("./controlerFactory");
const TeamModel = require("../models/teamModel");

//Create new Team
exports.createTeam = factory.createOne(TeamModel);

//Get all Teams
exports.getAllTeams = factory.getAll(TeamModel);

//delete Team by id
exports.deleteTeam = factory.deleteOneByID(TeamModel);

//update Team by id
exports.updateTeam = factory.updateOneID(TeamModel);

//Get Plyers in specific team by the team name
exports.getPlayersTeam = async (req, resp) => {
  try {
    const owner = await TeamModel.findOne({ name: req.params.name });
    const team = await owner.populate("players");
    resp.send(team.players);
  } catch (e) {
    resp.status(500).send();
    console.log(e);
  }
};

//Get team Power
exports.getTeamPower = async (req, resp) => {
  try {
    const team = await TeamModel.findOne({ name: req.params.name });
    const totalPower = await team.totalPower;

    resp.send(totalPower.toLocaleString());
  } catch (e) {
    console.log(e);
    resp.status(500).send();
  }
};
