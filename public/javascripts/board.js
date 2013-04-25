var board = (function() {

	var IMAGE_WIDTH = 600;
	var IMAGE_HEIGHT = 400;

	var BOARD_WIDTH = 600;
	var BOARD_HEIGHT = 400;
	var ALLOWED_SETUP_WIDTH = 200;

	var items = [];
	var game;
	var forbiddenAreas = [];


  // return true if one of the corner of the input item ends up in the forbidden area 
  // Forbidden area defined as: x2,y2 as top-left corner; w2, h2 as width and height
	function isForbidden(item, x2,y2,w2,h2) {

		var x1 = item.x;
		var y1 = item.y;

		if (item.type == "Tower"){
			var w1 = 50;//item.getWidth();
			var h1 = 50;//item.getItem().TOWER_HEIGTH;
		}else{	//Warrior	
			var w1 = 40;//item.getWarriorBase();
			var h1 = 40; //item.getWarriorBase();
		}

		if ( ( (x1 > x2 && x1< x2+w2) && (y1>y2 && y1<y2+h2) ) || 
			   ( (x1+w1 > x2 && x1+w1<x2+w2) && (y1+h1> y2 && y1+h1<y2+w2) ) || 
		     ( (x1+w1 > x2 && x1+w1<x2+w2) && (y1>y2 && y1<y2+h2) ) || 
			   ( (x1>x2 && x1<x2+w2) && (y1+h1>y2 && y1+h1<y2+h2) ) 
       ) {
			console.log("isForbidden true");
			return true;		
		}

		

		console.log("isForbidden false");
		return false;
  }


	return {

		init:function(){
			Crafty.init(IMAGE_WIDTH, IMAGE_HEIGHT);
			game = Crafty.e("2D, Canvas, Image")  
	    	.attr({w:IMAGE_WIDTH*2, h:IMAGE_HEIGHT})
				.image("images/fond_plateau_1.png");
		},
		
		setState:function(item, state){
			setState(item, state, item.player);
			return item;
		},
		
		isForbiddenArea:function(item) {
				console.log(items.length);
				console.log(item.player);
				// check for third part
				
				if (item.player === 1) {
					// Player one forbidden zone: 2/3 of the right part of the board + bottom part  
					if (isForbidden(item, (BOARD_WIDTH - (BOARD_WIDTH - ALLOWED_SETUP_WIDTH)) - 40, 0, BOARD_WIDTH, BOARD_HEIGHT) || isForbidden(item, 0, BOARD_HEIGHT-40, ALLOWED_SETUP_WIDTH, 40)) {
							return true;
					}
				}
				// Plqyer 2 forbidden zone: 2/3 of the left part of the board + left margin + bottom
				else{
					if (isForbidden(item, 0, 0, (BOARD_WIDTH-ALLOWED_SETUP_WIDTH) + 40, BOARD_HEIGHT + 40) || 
							isForbidden(item, BOARD_WIDTH-40, 0, 40, BOARD_HEIGHT) || 
							isForbidden(item, (BOARD_WIDTH-ALLOWED_SETUP_WIDTH) + 40, BOARD_HEIGHT-40, ALLOWED_SETUP_WIDTH-80, 40) ) {
							return true;
					}
				}

				for(var i=0; i<items.length; i++) {
						console.log(items[i].getItem().x);
						console.log(items[i].getItem().y);
       		  if (isForbidden(item, items[i].getItem().x, items[i].getItem().y, 40, 40 )) {
							return true;
						}
      	}
			return false;
		},
		
		//Fonction pour l'ajout d'un élément sur le plateau de jeu
		addItem:function(item) {
			//var item = new Item(item);
			
					if(item.type == "Tower"){
						console.log("tower");
						var item = new Tower(item);
					}else if(item.type == "Warrior"){
						var item = new Warrior(item);
						console.log("war");
					}
					
			items.push(item);
			return item;
		},

		getItems: function() {
			return items;
		},
		
		getGame: function() {
		    return game;
		}

	}       

})();
