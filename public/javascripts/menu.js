var menu = (function() {

    function init() {

	    var addTowerDiv = document.getElementById('btnAddTower');
	    var addWarriorDiv = document.getElementById('btnAddWarrior');
	    var stage = document.getElementById('cr-stage');

        var selectedElement = undefined;

        addTowerDiv.onclick = function() {
            selectedElement = "Tower";
        }
        
        addWarriorDiv.onclick = function() {
            selectedElement = "Warrior";
        }
        
        stage.onclick = function(evt) {
            console.log(evt);
            if(selectedElement) {
                board.addItem(selectedElement, evt.clientX - 250, evt.clientY);
            }
        }
    
    }
    
    return {
        init: function() {
            init();
        }
    }
    
})();
