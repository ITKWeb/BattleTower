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

return {

	init:function(){
		Crafty.init(IMAGE_WIDTH, IMAGE_HEIGHT);
		var bg = Crafty.e("2D, DOM, Image")  
	    	.attr({w:IMAGE_WIDTH*2, h:IMAGE_HEIGHT})
			.image("images/fond_plateau_1.png")
		//Towers
		var tower = Crafty.e("2D, DOM, Image")  
	    	.attr({w:TOWER_WIDTH, h:TOWER_WIDTH, x:75, y:250})
			.image("images/tour_verte_petite.png")

		//Warriors
		Crafty.sprite(WARRIOR_WIDTH, "images/guerrier1.png", {PlayerSprite: [0,0]} );

	Crafty.e("2D, DOM, SpriteAnimation, PlayerSprite")
	    .animate('PlayerRunning', 0, 0, 1) //setup animation
	    .animate('PlayerRunning', 40, -1) // start animation

	Crafty.e("2D, DOM, SpriteAnimation, PlayerSprite")
	    .animate('PlayerRunning', 0, 1, 0) //setup animation
	    .animate('PlayerRunning', 40, -1) // start animation
	},
	
	dead:function(){
		dead("PlayerSprite");
	}
}
       

})();
