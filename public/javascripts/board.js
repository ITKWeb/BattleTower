var board = (function() {

	var IMAGE_WIDTH = 800;
	var IMAGE_HEIGHT = 600;
	var TOWER_WIDTH = 40;
	var WARRIOR_WIDTH = 56;
	var warrior;

function dead(item){

Crafty.sprite(45, "images/guerrier_mort.png", {
    item: [250,60]
});

Crafty.e("2D, DOM, SpriteAnimation, item")
    .animate(item, 0, 0, 1) //setup animation
    .animate(item, 45, -1) // start animation

Crafty.e("2D, DOM, SpriteAnimation, item")
    .animate(item, 0, 1, 0) //setup animation
    .animate(item, 45, -1) // start animation
}

function addTower(x,y){
	var tower = Crafty.e("2D, DOM, Image")  
	    .attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:x, y:y})
		.image("images/tour_verte_petite.png")
}

function addWarrior(x,y){
	var warrior = Crafty.e("2D, DOM, Image")  
	    .attr({w:WARRIOR_WIDTH, h:WARRIOR_WIDTH, x:x, y:y})
		.image("images/guerrier_repos.png")
}

return {

	init:function(){
		Crafty.init(IMAGE_WIDTH, IMAGE_HEIGHT);
		var bg = Crafty.e("2D, DOM, Image")  
	    	.attr({w:IMAGE_WIDTH*2, h:IMAGE_HEIGHT})
			.image("images/fond_plateau_1.png")
		

		//Warriors
	//	Crafty.sprite(WARRIOR_WIDTH, "images/guerrier1.png", {PlayerSprite: [0,0]} );

	//Crafty.e("2D, DOM, SpriteAnimation, PlayerSprite")
	  //  .animate('PlayerRunning', 0, 0, 1) //setup animation
	    //.animate('PlayerRunning', 40, -1) // start animation

//	Crafty.e("2D, DOM, SpriteAnimation, PlayerSprite")
	//    .animate('PlayerRunning', 0, 1, 0) //setup animation
	  //  .animate('PlayerRunning', 40, -1) // start animation
	},
	
	dead:function(){
		dead("PlayerSprite");
	},
	
	//Fonction pour l'ajout d'un élément sur le plateau de jeu
	addItem:function(Type, x, y){
		if (Type=="Tower"){
			addTower(x,y);
		}		
		else if (Type=="Warrior"){
			addWarrior(x,y);
		}
	}

//return	
	}       

})();
