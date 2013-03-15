var menu = (function() {

    var isEditingMode = false;
    var timeout;

    function init() {
    
        var addTowerDiv = document.getElementById('btnAddTower');
        var addWarriorDiv = document.getElementById('btnAddWarrior');
        var stage = document.getElementById('cr-stage');
        
        var selectedElement = undefined;
        
        var warriors = [];
        var towers = [];
    
        addTowerDiv.onclick = function() {
            //if(isEditingMode == true) {
                selectedElement = "Tower";
                addTowerDiv.className = "btn select";
                addWarriorDiv.className = "btn";
            //} else {
            //    window.alert("Le jeu n'a pas commencé");
            //}
        }
        
        addWarriorDiv.onclick = function() {
            //if(isEditingMode == true) {
                selectedElement = "Warrior";
                addWarriorDiv.className = "btn select";
                addTowerDiv.className = "btn";
            //} else {
            //    window.alert("Le jeu n'a pas commencé");
            //}
        }
        
        document.getElementById('btnDeadWarrior').onclick = function() {
            for(var i=0; i<warriors.length; i++) {
                board.setState(warriors[i],"Dead");
            }
        }
        
        document.getElementById('btnRunWarrior').onclick = function() {
            for(var i=0; i<warriors.length; i++) {
                board.setState(warriors[i],"Running");
            }
        }
        
        stage.onclick = function(evt) {
            console.log(isEditingMode, selectedElement);
            //if(isEditingMode == true && selectedElement) {
                if(selectedElement == "Warrior") {
                    warriors.push(board.addItem(selectedElement, evt.clientX - 250, evt.clientY));
                } else {
                    towers.push(board.addItem(selectedElement, evt.clientX - 250, evt.clientY));
                }   
            //} else if(isEditingMode == false) {
            //    window.alert("Le jeu n'a pas commencé");
            //} else {
            //    window.alert("Selectionné un élément à ajouter");
            //}
        }
        
        network.addStartGameCallback(function(data) {
            startEditing();
        });
    
        network.addPlayCallback(function(data) {
            startGame(data);
        });
        
        function startEditing() {
            window.alert("Vous avez 30sc pour poser vos objets");
            isEditingMode = true;
            timeout=setTimeout(function() {
                isEditingMode = false;
                addWarriorDiv.className = "btn";
                addTowerDiv.className = "btn";
                /*var board = [];
                for(var i=0; i<warriors.length; i++) {
                    board.push(warriors[i]);
                }
                for(var i=0; i<towers.length; i++) {
                    board.push(towers[i]);
                }
                network.send({cmd:"endEditing", board:board});*/
                startGame({});
            },30000);
        }
        
        function startGame(data) {
            console.log(data);
            /*for(var i=0; i<data.p1.length; i++) {
                board.setState(warriors[i],"Running");
            }
            for(var i=0; i<data.p2.length; i++) {
                board.setState(warriors[i],"Running");
            }*/
            for(var i=0; i<warriors.length; i++) {
                board.setState(warriors[i],"Running");
            }
        }
    
    }
    
    return {
        init: function() {
            init();
        }
        
    }
    
})();
