var board = (function() {

	var IMAGE_WIDTH = 600;
	var IMAGE_HEIGHT = 400;
	var items = [];
	var game;
	var forbiddenAreas = [];


	function isForbidden(item1,item2) {

		var x1 = item1.craftyElem.x;
		var w1 = item1.craftyElem.w;

		var y1 = item1.craftyElem.y;
		var h1 = item1.craftyElem.h;

		var x2 = item2.craftyElem.x;
		var w2 = item2.craftyElem.w;

		var y2 = item2.craftyElem.y;
		var h2 = item2.craftyElem.h;


		if ( (x1 > x2 && x1< x2+w2) && (y1>y2 && y1<y2+h2) ) || 
			 ( (x1+w1 > x2 && x1+w1<x2+w2) && (y1+h1> y2 && y1+h1<y2+w2) ) || 
		   ( (x1+w1 > x2 && x1+w1<x2+w2) && (y1>y2 && y1<y2+h2) ) || 
			 ( (x1>x2 && x1<x2+w2) && (y1+h1>y2 && y1+h1<y2+h2) ) {
			return true;		
		}
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
		
		isForbiddenArea: function(item){
				
				for(var i=0; i<items.length; i++) {
       		  if (isForbidden(item, items[i])){
							return true;
						}
      	}
			return false;
			}
		}
		
		//Fonction pour l'ajout d'un élément sur le plateau de jeu
		addItem:function(item) {
			var item = new Item(item);
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
