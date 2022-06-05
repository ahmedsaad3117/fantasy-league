const express = require("express");
require("./db/mongoose");

const playersRouter = require("./routers/player");
const teamsRouter = require("./routers/team");
const startLeague = require("./routers/start-league");
const dropDB = require("./routers/dropDB");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(teamsRouter);
app.use(playersRouter);
app.use(startLeague);
app.use(dropDB);

app.listen(port, () => {
  console.log("Server is up and running in 3000");
});
