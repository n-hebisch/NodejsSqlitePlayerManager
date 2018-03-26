var express = require('express')
var router = express.Router()

const players = require('../Players.js')
const fileManager = require('../FileManager.js')
const playerDBManager = require('../playersDBManager.js')

router.get('/', function (req, res) {
  playerDBManager.getAllExistingPlayers(function (data) {
    res.render('player/index', {players: data})
  })
})

// Get a player
router.get('/:id', function (req, res) {
  var contentFile = fileManager.load('./players.csv')

  if (req.params.id !== undefined) {
    playerDBManager.getPlayerById(req.params.id, function (data) {
      res.render('player/index', {players: data})
    })
  }
  else {
    playerDBManager.getAllExistingPlayers(function (data) {
      res.render('player/index', {players: data})
    })
  }
})

// Create a new player
router.post('/', function (req, res) {
  var promiseCreatePlayer = playerDBManager.createPlayer(req.body.name)
  promiseCreatePlayer.then(function (result) {
    playerDBManager.getAllExistingPlayers(function (data) {
      res.render('player/index', {players: data})
    })
  }, function (err) {
    console.log(err)
  })
})

// Edit a player
router.put('/', function (req, res) {
  var promiseEditPlayer = playerDBManager.editPlayernameById(req.body.id, req.body.name)
  promiseEditPlayer.then(function (result) {
    playerDBManager.getAllExistingPlayers(function (data) {
      res.render('player/index', {players: data})
    })
  }, function (err) {
    console.log(err)
  })
})

// Delete a player
router.delete('/', function (req, res) {
  var promiseDeletePlayer = playerDBManager.deletePlayerById(req.body.id)
  promiseDeletePlayer.then(function (result) {
    playerDBManager.getAllExistingPlayers(function (data) {
      res.render('player/index', {players: data})
    })
  }, function (err) {
    console.log(err)
  })
})

module.exports = router