var Item = function(item) {

  var TOWER_WIDTH = 40;
  var WARRIOR_WIDTH = 40;
  var TOWER_TYPE="Tower";
  var WARRIOR_TYPE="Warrior";
  var TOWER_LIFE = 30;
  var TOWER_POWER = 10;
  var WARRIOR_LIFE = 20;
  var WARRIOR_POWER = 10;

  var craftyElem;

  var images = {
    tower_ok: "tower_ok_player",//images/tower_ok_player1.png
    tower_ko: "tower_ko_player",
    warrior_ok: "warrior_ready_player",
    warrior_ko: "warrior_dead_player",
    tower_firering: "tower_firering_player"
  };

	Crafty.sprite(40, 'images/warrior_running_player1.png', {
			warrior_running_1: [0,0]
	});

	Crafty.sprite(40, 'images/warrior_running_player2.png', {
			warrior_running_2: [0,0]
	});



  function init() {
    if(item.type == TOWER_TYPE) {
		craftyElem = Crafty.e("tower, 2D, Canvas, Image, Collision")
		  .attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:item.x, y:item.y});
		craftyElem.image(getImage("tower_ok", item.player));
		this.life = TOWER_LIFE;
    } else {
		craftyElem = Crafty.e("warrior, 2D, Canvas, Image, Collision")
		  .attr({w:WARRIOR_WIDTH, h:WARRIOR_WIDTH, x:item.x, y:item.y});
		craftyElem.image(getImage("warrior_ok", item.player));
		this.life = WARRIOR_LIFE;
    }
  }


  function getImage(name, num) {
		//console.log("images/" + images[name] + num + ".png");
    return "images/" + images[name] + num + ".png";
  }

	function getSprite(name, num) {
		return name+"_"+num;
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
		craftyElem.collision();
    } else if (item.type == WARRIOR_TYPE) {   
      if (state == "Ready"){
        craftyElem.image(getImage("warrior_ok", item.player));
      } else if (state == "Running") {

        console.log("on essaie de courrir.");
		craftyElem.destroy();

		craftyElem=Crafty.e("2D, Canvas, "+getSprite("warrior_running", item.player)+", SpriteAnimation, Collision").attr({w:WARRIOR_WIDTH, h:WARRIOR_WIDTH, x:item.x, y:item.y});
		craftyElem.animate('PlayerRunning', 1, 0, 2).animate('PlayerRunning', 20, -1);

        craftyElem.bind("EnterFrame", function() {
          if(item.player == 1) {
            craftyElem.move("e", 1.2);
          } else {
            craftyElem.move("w", 1.2);
          }
        });
		craftyElem.collision();
		craftyElem.onHit("tower",function() {
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




//TOWER


var Tower = function(tower) {

  var TOWER_WIDTH = 50;
  var craftyElem;

  var images = {
    tower_ok: "tower_ok_player",//images/tower_ok_player1.png
    tower_ko: "tower_ko_player",
    tower_firering: "tower_firering_player"
  };

  function init() {
	craftyElem = Crafty.e("tower, 2D, Canvas, Image, Collision, WiredHitBox")
	  .attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:tower.x, y:tower.y});
	craftyElem.image(getImage("tower_ok", tower.player));
	craftyElem.collision([-30,-30],[80,-30],[80,80],[-30,80]);
  }

  function getImage(name, num) {
	//console.log("images/" + images[name] + num + ".png");
	return "images/" + images[name] + num + ".png";
  }

  function setState(state){
      if (state == "OK") {
        craftyElem.image(getImage("tower_ok", tower.player));
      } else if (state == "KO") {
        craftyElem.image(getImage("tower_ko", tower.player))
      } else if (state == "Firering") {
        craftyElem.image(getImage("tower_firering", tower.player));
      }
		craftyElem.onHit("warrior",function() {
			console.log("tour touche warrior");
			var tir = new Projectil(this,this.hit);
			
		});
  }

  init();

  return {
    setState: function(state) {
      setState(state);
    },
    getItem: function() {
      return tower;
    }
  }
};



//WARRIOR



var Warrior = function(warrior) {
  var WARRIOR_WIDTH = 40;
  var craftyElem;

  var images = {
    warrior_ok: "warrior_ready_player",
    warrior_ko: "warrior_dead_player"
  };

	Crafty.sprite(40, 'images/warrior_running_player1.png', {
			warrior_running_1: [0,0],
	});

	Crafty.sprite(40, 'images/warrior_running_player2.png', {
			warrior_running_2: [0,0],
	});



  function init() {
	craftyElem = Crafty.e("warrior, 2D, Canvas, Image, Collision")
	  .attr({w:WARRIOR_WIDTH, h:WARRIOR_WIDTH, x:warrior.x, y:warrior.y});
	craftyElem.image(getImage("warrior_ok", warrior.player));
  }

  function getImage(name, num) {
		//console.log("images/" + images[name] + num + ".png");
    return "images/" + images[name] + num + ".png";
  }

	function getSprite(name, num) {
		return name+"_"+num;
  }
	

  function setState(state){   
      if (state == "Ready"){
        craftyElem.image(getImage("warrior_ok", warrior.player));
      } else if (state == "Running") {

		craftyElem.destroy();

		craftyElem=Crafty.e("2D, Canvas, "+getSprite("warrior_running", warrior.player)+", SpriteAnimation, Collision, WiredHitBox").attr({w:WARRIOR_WIDTH, h:WARRIOR_WIDTH, x:warrior.x, y:warrior.y});
		craftyElem.collision([-30,-30],[80,-30],[80,80],[-30,80]);
		craftyElem.animate('PlayerRunning', 0, 0, 2).animate('PlayerRunning', 40, -1);
		
        craftyElem.bind("EnterFrame", function() {
          if(warrior.player == 1) {
            craftyElem.move("e", 1.2);
          } else {
            craftyElem.move("w", 1.2);
          }
        });
		craftyElem.onHit("tower",function() {
			console.log("warrior touche tour");
            this.unbind("EnterFrame");
			var tir = new Projectil(this,this.hit);
        });
      } else if (state == "Dead") {
        craftyElem.unbind("EnterFrame");
        craftyElem.image(getImage("warrior_ko", warrior.player))
        setTimeout(function() {
          craftyElem.undraw();
        }, 1000);       
      }
    
  }

  init();

  return {
    setState: function(state) {
      setState(state);
    },
    getItem: function() {
      return warrior;
    }
  }

};





