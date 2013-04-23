var Item = function(item) {

  var TOWER_WIDTH = 40;
  var WARRIOR_WIDTH = 56;
  var TOWER_TYPE="Tower";
  var WARRIOR_TYPE="Warrior";

  var craftyElem;

  var images = {
    tower_ok: "tower_ok_player",//images/tower_ok_player1.png
    tower_ko: "tower_ko_player",
    warrior_ok: "warrior_ready_player",
    warrior_ko: "warrior_dead_player",
    tower_firering: "tower_firering_player"
  };

  function init() {
    craftyElem = Crafty.e("2D, Canvas, Image")
      .attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:item.x, y:item.y});
    if(item.type == TOWER_TYPE) {
      craftyElem.image(getImage("tower_ok", item.player));
    } else {
      craftyElem.image(getImage("warrior_ok", item.player));
    }
  }

  function getImage(name, num) {
		//console.log("images/" + images[name] + num + ".png");
    return "images/" + images[name] + num + ".png";
  }

  function setState(state){
    if (item.type == TOWER_TYPE) {
      if (state == "OK") {
        craftyElem.image(getImage("tower_ok", item.player));
      } else if (state == "KO") {
        craftyElem.image(getImage("tower_ko", item.player))
      } else if (state == "Firering") {
        craftyElem.image(getImage("tower_firering", item.player));
      }
    } else if (item.type == WARRIOR_TYPE) {   
      if (state == "Ready"){
        craftyElem.image(getImage("warrior_ok", item.player));
      } else if (state == "Running") {
        //console.log("on essaie de courrir.");
        craftyElem.bind("EnterFrame", function() {
          if(item.player == 1) {
            craftyElem.move("e", 1.2);
          } else {
            craftyElem.move("w", 1.2);
          }
        });
      } else if (state == "Dead") {
        craftyElem.unbind("EnterFrame");
        craftyElem.image(getImage("warrior_ko", item.player))
        setTimeout(function() {
          craftyElem.undraw();
        }, 1000);       
      }
    }
  }

  init();

  return {
    setState: function(state) {
      setState(state);
    },
    getItem: function() {
      return item;
    }
  }

};
