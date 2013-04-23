var Projectil = function(from, to) {

    var onHitCb = [];
<<<<<<< HEAD
    var SIZE = {w:TOWER_WIDTH, h:TOWER_WIDTH, x:item.x, y:item.y};

    function init() {
        Crafty.e("warrior, 2D, Canvas, Collision")
=======
    var size = {w:10, h:20, x:from.x, y:from.y};

    function init() {
        var e = Crafty.e("2D, Canvas, Collision, Color")
>>>>>>> 2a8e5de13baa89a7352a5c434142af4c4da7d7c2
            .attr(size)
            .color("red")
            .onHit("tower", function() {
                onHitCb
            })
            .collision()
            .bind("EnterFrame", function() {
                e.move("e", 1.2);
            });
    }
    
    init();
    
    return {
        onHit: function(cb) {
            onHitCb.push(cb);
        }
    }

};
