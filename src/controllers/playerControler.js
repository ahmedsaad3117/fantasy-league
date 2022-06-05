const factory =  require('./controlerFactory')
const PlayerModel = require("../models/playerModel");

//Create new player
exports.createPlayer = factory.createOne(PlayerModel)

//Get all players
exports.getAllPlayers = factory.getAll(PlayerModel)

//delete player by id 
exports.deletePlayer = factory.deleteOneByID(PlayerModel)

//update player by id 
exports.updatePlayer = factory.updateOneID(PlayerModel)
