var board = (function() {

	var IMAGE_WIDTH = 600;
	var IMAGE_HEIGHT = 400;
	var items = [];
	var game;
	var forbiddenAreas = [];


	function isForbidden(item1, x2,y2,w2,h2) {

		var x1 = item1.x;
		var y1 = item1.y;

		if (item1.type == "Tower"){
			var w1 = 40;
			var h1 = 40;
		}else{	//Warrior	
			var w1 = 40;
			var h1 = 40;
		}

//		console.log(x1);
	//	console.log(x2);
		//console.log(y1);
//		console.log(y2);

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
				
				if (item.player === 1){
					if (isForbidden(item, 200, 0, 400, 600 )) {
							return true;
					}
				}else{
					if (isForbidden(item, 0, 0, 400, 600 )) {
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
