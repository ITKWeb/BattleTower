var menu = (function() {

  var isEditingMode = false;
  var playerNumber = 2;
  var addTowerDiv;
  var addWarriorDiv;
  var stage;
  var tempo;

  function init() {
  
    addTowerDiv = document.getElementById('btnAddTower');
    addWarriorDiv = document.getElementById('btnAddWarrior');
    stage = document.getElementById('cr-stage');
    tempo = document.getElementById('tempo');
    
    var selectedElement = undefined;
    
    addTowerDiv.onclick = function() {
      if(isEditingMode == true) {
        selectedElement = "Tower";
        addTowerDiv.className = "btn select";
        addWarriorDiv.className = "btn";
      } else {
        window.alert("Le jeu n'a pas commencé");
      }
    }
      
    addWarriorDiv.onclick = function() {
      if(isEditingMode == true) {
        selectedElement = "Warrior";
        addWarriorDiv.className = "btn select";
        addTowerDiv.className = "btn";
      } else {
        window.alert("Le jeu n'a pas commencé");
      }
    }
      
    stage.onclick = function(evt) {
      console.log(isEditingMode, selectedElement, evt);
      if(isEditingMode == true && selectedElement) {
        board.addItem({type: selectedElement, x: evt.layerX, y: evt.clientY, player: playerNumber});
      } else if(isEditingMode == false) {
        window.alert("Le jeu n'a pas commencé");
      } else {
        window.alert("Selectionné un élément à ajouter");
      }
    }
  }

  var tempoTimer;

  function startTempo(delay) {
    tempo.innerHTML = delay;
    tempoTimer = setTimeout(function() {
      if(delay - 1 > 0) {
        startTempo(delay - 1);
      } else {
        tempo.innerHTML = "Fight !!";
      }
    }, 1000);
  }
  
  return {
    init: function() {
      init();
    },
    setEditing: function(bool) {
      isEditingMode = bool;
      if(bool == false) {
        addTowerDiv.className = "btn";
        addWarriorDiv.className = "btn";
      }
    },
    setPlayerNumber: function(num) {
      playerNumber = num;
    },
    startTempo: function(delay) {
      startTempo(delay);
    }
  }
    
})();
