var Item = function(item) {

  var TOWER_WIDTH = 40;
  var WARRIOR_WIDTH = 40;
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
    if(item.type == TOWER_TYPE) {
		craftyElem = Crafty.e("tower, 2D, Canvas, Image, Collision")
		  .attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:item.x, y:item.y});
		craftyElem.image(getImage("tower_ok", item.player));
    } else {
		craftyElem = Crafty.e("warrior, 2D, Canvas, Image, Collision")
		  .attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:item.x, y:item.y});
		craftyElem.image(getImage("warrior_ok", item.player));
    }
  }

  function getImage(name, num) {
		console.log("images/" + images[name] + num + ".png");
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
        console.log("on essaie de courrir.");
		
		Crafty.sprite(40, 'images/warrior_running_player1.png', {
		warrior_running: [0,0],
			});
		
		craftyElem.destroy();
		craftyElem=Crafty.e("2D, Canvas, warrior_running, SpriteAnimation, Collision").attr({w:WARRIOR_WIDTH, h:WARRIOR_WIDTH, x:item.x, y:item.y});
		craftyElem.animate('PlayerRunning', 0, 0, 1).animate('PlayerRunning', 40, -1);
        craftyElem.bind("EnterFrame", function() {
          if(item.player == 1) {
            craftyElem.move("e", 1.2);
          } else {
            craftyElem.move("w", 1.2);
          }
        });
		craftyElem.onHit("tower", function() {
			console.log("touche !");
            this.unbind("EnterFrame");
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
