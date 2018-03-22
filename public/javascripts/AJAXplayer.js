function createPlayer (name) {
  if (name.search(',') === -1 && name !== '' && name !== undefined) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        document.getElementsByTagName('html')[0].innerHTML=this.responseText;
      }
    }
    xhttp.open('POST', '/player', true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhttp.send('name=' + name)
  }
}

function deletePlayerById (ID) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementsByTagName('html')[0].innerHTML=this.responseText;
    }
  }
  xhttp.open('DELETE', '/player', true)
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhttp.send('id=' + ID)
}

//ändert den Namen des Spielers
function editPlayername (name, ID) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementsByTagName('html')[0].innerHTML=this.responseText;
    }
  }
  xhttp.open('PUT', '/player', true)
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhttp.send('name=' + name + '&id=' + ID)
}

function getElementByName (array, name) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      return array[i]
    }
  }
}

function changeButtonLevelTo (level, element) {
  var buttons = element.parentNode.getElementsByTagName('button')
  if (level === 1) {

    var buttonEdit = getElementByName(buttons, 'Edit')
    buttonEdit.style.display = ''
    var buttonDelete = getElementByName(buttons, 'Delete')
    buttonDelete.style.display = ''
    var buttonEditSave = getElementByName(buttons, 'Save')
    buttonEditSave.style.display = 'none'
  }
  else if (level === 2) {
    var buttonEdit = getElementByName(buttons, 'Edit')
    buttonEdit.style.display = 'none'
    var buttonDelete = getElementByName(buttons, 'Delete')
    buttonDelete.style.display = 'none'
    var buttonEditSave = getElementByName(buttons, 'Save')
    buttonEditSave.style.display = ''
  }
}