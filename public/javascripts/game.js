var game = (function() {

    function init() {
        var game = board.getGame();
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
