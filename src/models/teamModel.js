const mongoose = require("mongoose");
const PlayerModel = require("./playerModel");
const generator = require("../utils/genreateDefults");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please insert a name"],
    uppercase: true,
    default: () => generator.generateStr(),
  },
  color: {
    type: String,
    required: [true, "Please insert a team color"],
    default: () => generator.generateColor(),
  },
  points: {
    type: Number,
    default: 0,
  },
  playedMatch: {
    type: Number,
    default: 0,
  },
});

teamSchema.virtual("players", {
  ref: "Player",
  localField: "name",
  foreignField: "owner",
});


teamSchema.virtual("totalPower").get(async function () {
  const totalP = await this.populate("players");

  let teamTotalPower = 0;

  totalP.players.map((player) => {
    teamTotalPower += player.totalPower / 7; 
  });

  return teamTotalPower;
});



const TeamModel = mongoose.model("Team", teamSchema);
module.exports = TeamModel;
