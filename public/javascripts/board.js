var board = (function() {

	var IMAGE_WIDTH = 600;
	var IMAGE_HEIGHT = 400;
	var items = [];
	var game;

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
