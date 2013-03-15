var board = (function() {

	var IMAGE_WIDTH = 800;
	var IMAGE_HEIGHT = 600;
	var TOWER_WIDTH = 40;
	var WARRIOR_WIDTH = 56;
	var TOWER_TYPE="Tower";
	var WARRIOR_TYPE="Warrior";

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

function setProperties(item,x,y,player,type){
	item.x=x;
	item.y=y;
	item.player=player;
	item.type=type;
}

function addTower(x,y,player){
	if (!player){
		player = 1;
	}
	var tower = Crafty.e("2D, DOM, Image")  
	    .attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:x, y:y})
		if (player == 2){
			tower.image("images/tower_ok_player2.png")
		}else{
			tower.image("images/tower_ok_player1.png")
		}
	
	setProperties(tower,x,y,player,TOWER_TYPE);
	return tower;
}

function addWarrior(x,y,player){
	if (!player){
		player = 1;
	}
	var warrior = Crafty.e("2D, DOM, Image")  
	    .attr({w:WARRIOR_WIDTH, h:WARRIOR_WIDTH, x:x, y:y})
	if (player == 2){
			warrior.image("images/warrior_ready_player1.png")
		}else{
			warrior.image("images/warrior_ready_player1.png")
		}
	setProperties(warrior,x,y,player,WARRIOR_TYPE);
	return warrior;
}

 

function setState(item,state,player){



	if (!player){
		player = 1;
	}
	if (item.type == TOWER_TYPE){
		if (state == "OK"){
			if (player == 1){
				item.image("images/tower_ok_player1.png")
			}else{
				item.image("images/tower_ok_player2.png")
			}
		}else if (state == "KO"){
			if (player == 1){
				item.image("images/tower_ko_player1.png")
			}else{
				item.image("images/tower_ko_player2.png")
			}
		}else if (state == "Firering"){
			if (player == 1){
				item.image("images/tower_firering_player1.png")
			}else{
				item.image("images/tower_firering_player2.png")
			}
		}
	}else if (item.type == WARRIOR_TYPE){ 	
		if (state == "Ready"){
		item.bind("EnterFrame", function() {
        });
			if (player == 1){
				item.image("images/warrior_ready_player1.png")
			}else{
				item.image("images/warrior_ready_player2.png")
			}
		}else if (state == "Running"){
			console.log("on essaie de courrir.");
			item.bind("EnterFrame", function() {
	            item.move("e", 1.2);
   		    });

		}else if (state == "Dead"){
			//item.stop();
			item.unbind("EnterFrame");
		if (player == 1){
				item.image("images/warrior_dead_player1.png")
			}else{
				item.image("images/warrior_dead_player2.png")
		}
 //var warriorRunning = Crafty.e("2D, DOM, warriorRunning, animation")
   //     .attr({x: 0, y: 0, w: item.x, h: item.y}) // Set the position
     //   .animate("anim", 5, 0, 11); // Create the "anim" animation,
                                            // starting from coordinate x=5 and going to x=11, with y=0

//				Crafty.e("2D, DOM, SpriteAnimation, itemSprite")
//			.animate(item, 0, 0, 1) //setup animation
//			.animate(item, WARRIOR_WIDTH, -1) // start animation

	//			Crafty.e("2D, DOM, SpriteAnimation, itemSprite")
		//    .animate(item, 0, 1, 0) //setup animation
		//	  .animate(item, 40, -1) // start animation
			
		}
	}
	return item;
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
	
	setState:function(item,state){
		setState(item,state);
		return item;
	},
	
	//Fonction pour l'ajout d'un élément sur le plateau de jeu
	addItem:function(Type, x, y,player){
		if (!player){
		player = 1;
	}
		if (Type==TOWER_TYPE){
			return addTower(x,y,player);
		}		
		else if (Type==WARRIOR_TYPE){
			return addWarrior(x,y,player);
		}
	}

//return	
	}       

})();
