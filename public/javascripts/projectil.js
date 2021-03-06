var Projectil = function(from, to) {

    var onHitCb = [];
    var size = {w:5, h:5, x:from.x, y:from.y};
    var speed = 2;
    var oldDirection = { x: 0, y: 0 };

    function init() {
        Crafty.e("2D, Canvas, Collision, Color")
            .attr(size)
            .color("red")
            .onHit("tower", function() {
                var l = onHitCb.length;
                for(var i=0; i<l; i++) {
                    onHitCb(from, to);
                }
                this.destroy();
                this.unbind("EnterFrame");
            })
            .collision()
            .bind("EnterFrame", function() {
                console.log(to[0].obj);
                
                var toX = to[0].obj.x + to[0].obj.h/2;
                var toY = to[0].obj.y + to[0].obj.w/2;
                
		        // Pixels to move are calculated from location and target every frame to handle the case when something else (IE, collision detection logic) changes our position.
		        // Some cleaver optimization could probably eliminate the sqrt cost...
		        var dx = toX - this.x, dy = toY - this.y,
		        movX = (dx * speed) / (Math.sqrt(dx * dx + dy * dy)),
		        movY = (dy * speed) / (Math.sqrt(dx * dx + dy * dy));

		        oldDirection = { x: movX, y: movY };

		        // Moved triggered twice to allow for better collision logic (like moving along diagonal walls)
		        this.x += movX;
		        this.y += movY;
		        console.log("move to ", movX, movY);
            });
    }
    
    init();
    
    return {
        onHit: function(cb) {
            onHitCb.push(cb);
        }
    }

};
