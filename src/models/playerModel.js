const mongoose = require("mongoose");
const TeamModel = require("./teamModel");
const generator = require("../utils/genreateDefults");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please insert a name"],
    default: () => generator.generateStr(),
  },

  playerNumber: {
    type: String,
    required: [true, "Please insert a number"],
    validate(num) {
      if (num.length > 2) {
        throw new Error("Please insert a number with only 2 digits");
      }
    },
    default: () => generator.generateNumbers(),
  },

  height: {
    type: Number,
    required: [true, "Please insert a vaild height 70-230"],
    min: 70,
    max: 230,
    default: 170,
  },

  speed: {
    type: Number,
    required: [true, "Please insert a vaild speed rate 0-100"],
    min: 0,
    max: 100,
    default: () => generator.generateNumbers(),
  },

  physical: {
    type: Number,
    required: [true, "Please insert a vaild physical rate 0-100"],
    min: 0,
    max: 100,
    default: () => generator.generateNumbers(),
  },

  shoot: {
    type: Number,
    required: [true, "Please insert a vaild shoot rate 0-100"],
    min: 0,
    max: 100,
    default: () => generator.generateNumbers(),
  },

  passing: {
    type: Number,
    required: [true, "Please insert a vaild passing rate 0-100"],
    min: 0,
    max: 100,
    default: () => generator.generateNumbers(),
  },

  totalPower: {
    type: Number,
  },

  owner: {
    type: String,
    required: [true, "Please Create a team"],
    ref: "Team",
  },
});

playerSchema.pre("save", async function (next) {
  const owner = await TeamModel.findOne({ name: this.owner });

  if (!owner) {
    throw new Error("pls enter a vaild team name");
  }

  const team = await owner.populate("players");

  if (team.players.length >= 7) {
    throw new Error("The max number of player in one team is 7");
  }
  next();
});

playerSchema.pre(["save", "insertMany"], async function (next, docs) {
  const players = docs;
  players.map((player) => {
    player.totalPower =
      (player.passing + player.shoot + player.physical + player.speed) / 4;
  });
  next();
});

const PlayerModel = mongoose.model("Player", playerSchema);
module.exports = PlayerModel;
