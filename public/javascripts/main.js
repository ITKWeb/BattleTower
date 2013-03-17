(function() {

  window.onload = function() {
    board.init();
    menu.init();

    var number = 2;//by default
    var idGame;
    var glass = document.getElementById('glass');

    network.onCmd('youAreFirst', function() {
      number = 1;
      menu.setPlayerNumber(1);
    });

    network.onCmd('startEditing', function(data) {
      idGame = data.idGame;
      glass.hidden = true;
      startEditing();
    });

    network.onCmd('endEditing', function(data) {
      startGame(data);
    });

    function startEditing() {
      menu.setEditing(true);
      menu.startTempo(5);
      setTimeout(function() {
        menu.setEditing(false);
        var myboard = [];
        var items = board.getItems();
        for(var i=0; i<items.length; i++) {
          myboard.push(items[i].getItem());
        }
        network.send({cmd: "endEditing", idGame: idGame, num: number, board: myboard});
      },5000);
    }
      
    function startGame(data) {
      console.log(data);
      //add items' other gamer
      if(number == 2) {
        for(var i=0; i<data.boardP1.length; i++) {
          board.addItem(data.boardP1[i]);
        }
      } else {
        for(var i=0; i<data.boardP2.length; i++) {
          board.addItem(data.boardP2[i]);
        }
      }
      //run my items
      var items = board.getItems();
      for(var i=0; i<items.length; i++) {
        items[i].setState("Running");
      }
    }

  }

})();
