var menu = (function() {


  var isEditingMode = false;
  var playerNumber = 2;
  var addTowerDiv;
  var addWarriorDiv;

  var addTowerDivPlayer1;
  var addWarriorDivPlayer1;
  var addTowerDivPlayer2;
  var addWarriorDivPlayer2;

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

	if (devmod = true){
		addTowerDivPlayer1 = document.getElementById('btnAddTowerp1');
		addTowerDivPlayer1.onclick = function() {
			selectedElement = "Tower";
			addTowerDivPlayer1.className = "btn select";
		}
		addWarriorDivPlayer1 = document.getElementById('btnAddWarriorp1');
		addWarriorDivPlayer1.onclick = function() {
			selectedElement = "Warrior";
			addWarriorDivPlayer1.className = "btn select";
		}
		addTowerDivPlayer2 = document.getElementById('btnAddTowerp2');
		addTowerDivPlayer2.onclick = function() {
			selectedElement = "Tower";
			addTowerDivPlayer2.className = "btn select";
		}
		addWarriorDivPlayer2 = document.getElementById('btnAddWarriorp2');
		addWarriorDivPlayer2.onclick = function() {
			selectedElement = "Warrior";
			addWarriorDivPlayer2.className = "btn select";
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
