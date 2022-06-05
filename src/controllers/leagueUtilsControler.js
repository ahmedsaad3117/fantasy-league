const PlayerModel = require("../models/playerModel");
const TeamModel = require("../models/teamModel");

const gamePlay = require('../utils/gamePlay')

exports.createTeamsAndPlayers = async (req, resp) => {
  try {
    let teams = [];

    for (let i = 0; i < 7; i++) {
      teams.push(await new TeamModel());
    }
    const savedTeams = await TeamModel.insertMany(teams);

    savedTeams.map(async (team) => {
      let players = [];
      for (let i = 0; i < 7; i++) {
        players.push(await new PlayerModel({ owner: team.name }));
      }
      await PlayerModel.insertMany(players);
    });

    resp.status(201).send(savedTeams);
  } catch (e) {
    resp.status(500).send();
    console.log(e);
  }
};

exports.startLeague = async (req, resp) => {
  try {
    const teams = await TeamModel.find({});

    await gamePlay.startMatch(teams);

    const championTeams = await TeamModel.find({})
      .sort({ points: -1 })
      .limit(2);

    const winner = await gamePlay.championMatch(championTeams);

    resp.send({ winner });
  } catch (e) {
    console.log(e);
    resp.status(500).send();
  }
};
