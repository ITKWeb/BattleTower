var Projectil = function(from, to) {

    var onHitCb = [];
    var SIZE = {w:10, h:20, x:from.x, y:from.y};

    function init() {
        Crafty.e("2D, Canvas, Collision")
            .attr(size)
            .onHit("tower", function() {
                var l = onHitCb.length;
                for(var i=0; i<l; i++) {
                    onHitCb(from, to);
                }
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
