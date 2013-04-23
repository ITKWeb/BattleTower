var game = (function() {

    function init() {
        var game = board.getGame();
		
		var score = [0,0];
		function addScore(player, sum) {
			score[player]= score[player]+sum;
		}

		function addScore(player, sum) {
			score[player]= score[player]+sum;
		}
		
        network.onCmd('', function() {
        
        });
        game.bind("EnterFrame", function() {
            //console.log("ok");
        });
    }
    
    return {
        init: function() {
           init();
        }
    }

})();
