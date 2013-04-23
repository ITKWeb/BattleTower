var game = (function() {

    function init() {
        var game = board.getGame();
		
		var score = [0,0];
		
		var scorep1 = document.getElementById('score1');
		var scorep2 = document.getElementById('score2');
		refreshScore();

		function addScore(player, sum) {
			score[player-1]= score[player-1]+sum;
			refreshScore();
			return score[player-1];
		}

		function getScore(player) {
			return score[player-1];
		}

		function refreshScore(){
			scorep1.innerHTML=score[0]+ " points";
			scorep2.innerHTML=score[1]+ " points";
		}

		addScore(1,25);
		console.log(getScore(1));
		
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
