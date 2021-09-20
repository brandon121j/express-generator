var express = require('express');
var router = express.Router();

let teamArray = [
  {
    id: 1,
    name: "lakers",
    playersArray: [
      {
        player: "kobe",
      },
      {
        player: "shaq",
      },
    ],
  },
  {
    id: 2,
    name: "celtics",
    playersArray: [
      {
        player: "bird",
      },
      {
        player: "tatum",
      },
    ],
  },
];

let showTeamArray = [
  {
    team: "lakers",
  },
  {
    team: "knicks",
  },
  {
    team: "nets",
  },
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render("team", { teams: showTeamArray });
});

module.exports = router;
