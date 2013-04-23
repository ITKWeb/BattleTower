var Projectil = function(from, to) {

    var onHitCb = [];
<<<<<<< HEAD
    var SIZE = {w:TOWER_WIDTH, h:TOWER_WIDTH, x:item.x, y:item.y};

    function init() {
        Crafty.e("warrior, 2D, Canvas, Collision")
            .attr(size);
            .onHit("tower", function() {
                onHitCb
=======
    var SIZE = {w:10, h:20, x:from.x, y:from.y};

    function init() {
        Crafty.e("2D, Canvas, Collision")
            .attr(size)
            .onHit("tower", function() {
                var l = onHitCb.length;
                for(var i=0; i<l; i++) {
                    onHitCb(from, to);
                }
>>>>>>> 9c57738be725562023c6d546337d453a95a0ee84
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
