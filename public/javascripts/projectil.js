var Projectil = function(from, to) {

    var onHitCb = [];
    var SIZE = {w:10, h:20, x:from.x, y:from.y};

    function init() {
        var e = Crafty.e("2D, Canvas, Collision, Color")
            .attr(size)
            .color("red")
            .onHit("tower", function() {
                var l = onHitCb.length;
                for(var i=0; i<l; i++) {
                    onHitCb(from, to);
                }
            })
            .collision()
            .bind("EnterFrame", function() {
                craftyElem.move("e", 1.2);
            });
    }
    
    init();
    
    return {
        onHit: function(cb) {
            onHitCb.push(cb);
        }
    }

};
