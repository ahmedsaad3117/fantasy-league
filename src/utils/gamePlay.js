const generator = require("./genreateDefults");

exports.startMatch = async (teams) => {
  for (let i = 0; i < teams.length; i++) {
    for (let k = i + 1; k < teams.length; k++) {
      teams[i].playedMatch += 1;
      teams[k].playedMatch += 1;
      if (
        (await teams[i].totalPower) + generator.generateWinningChance() >
        (await teams[k].totalPower) + generator.generateWinningChance()
      ) {
        teams[i].points += 2;
      } else if (
        (await teams[i].totalPower) + generator.generateWinningChance() ===
        (await teams[k].totalPower) + generator.generateWinningChance()
      ) {
        teams[i].points += 1;
      } else {
        teams[k].points += 2;
      }
      await teams[i].save();
      await teams[k].save();
    }
  }
};

exports.championMatch = async (teams) => {
  if (
    (await teams[0].totalPower) + generator.generateWinningChanceChampion() >
    (await teams[1].totalPower) + generator.generateWinningChanceChampion()
  ) {
    return teams[0];
  } else {
    return teams[1];
  }
};
