const fs = require('fs')

var Players = {

  createPlayer: function createPlayer (req, csvString) {
    var lines = csvString.split('\n').length
    var content = csvString + lines + ',' + req.body.name + ',true' + '\n'
    return content
  },

  deleteLastPlayer: function deleteLastPlayer (csvString) {
    var playerArray = csvString.split('\n')
    for (var x = playerArray.length - 1; x >= 0; x--) {
      if (playerArray[x].search('true') !== -1) {
        playerArray[x] = playerArray[x].replace('true', 'false')
        break
      }
    }

    var content = ''
    for (var k = 0; k < playerArray.length; k++) {
      content += playerArray[k]
      if (k !== playerArray.length - 1)
        content += '\n'
    }
    return content
  },

  deletePlayerById: function deletePlayerById (id, csvString) {
    var player = this.findById(id, csvString)
    var playerInfo = player.split(',')
    if (playerInfo[2] === 'true')
      playerInfo[2] = 'false'
    var updatedPlayer = playerInfo.join()
    csvString = csvString.replace(player, updatedPlayer)
    return csvString
  },

  editPlayernameById: function editPlayernameById (id, newPlayername, csvString) {
    var playerToEdit = this.findById(id, csvString)
    var editedPlayerTemp = playerToEdit.split(',')
    editedPlayerTemp[1] = newPlayername
    var updatedcsvString = csvString.replace(playerToEdit, editedPlayerTemp)
    return updatedcsvString
  },

  findById: function findById (id, csvString) {
    var playerArray = csvString.split('\n')

    for (var x = 0; x < playerArray.length; x++) {
      var splittedPlayer = playerArray[x].split(',')

      if (splittedPlayer[0].search(id) !== -1 && splittedPlayer[0] === id) {
        return playerArray[x]
      }
    }
    return ''
  },

  //Umwandlung für Twig Array: [[id,name,exists],[],[],...]
  //Player only gets pushed when exists === true
  convertToArray: function (csvString) {
    var playerArray = csvString.split('\n')
    var array = []
    for (i in playerArray) {
      var playerElements = playerArray[i].split(',')
      var player = []
      if (playerElements[2] === 'true') {
        for (x in playerElements) {
          player.push(playerElements[x])
        }
        array.push(player)
      }
    }
    return array
  }
}

module.exports = Players