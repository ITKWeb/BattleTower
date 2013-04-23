var Projectil = function(from, to) {

    var onHitCb = [];
    var SIZE = {w:TOWER_WIDTH, h:TOWER_WIDTH, x:item.x, y:item.y};

    function init() {
        Crafty.e("warrior, 2D, Canvas, Collision")
            .attr(size)
            .onHit("tower", function() {
                onHitCb
            })
            .collision();
    }
    
    init();
    
    return {
        onHit: function(cb) {
            onHitCb.push(cb);
        }
    }

};
