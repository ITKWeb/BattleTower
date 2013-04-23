var game = (function() {

    function init() {
        var game = board.getGame();
		
		var score = [0,0];


		
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
