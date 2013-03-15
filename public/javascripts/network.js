var network = (function() {

    var wshost = "ws://192.168.1.33:9000/ws";
    var socket = undefined;//ws mode
    var callback = {};
    var startGameCallback = undefined;
    var playCallback = undefined;

    function webSocketMode(param1) {
      if(socket == undefined) {
        socket = new WebSocket(wshost);
        socket.onclose = function() { 
          socket = undefined; 
          console.log('WS closed'); 
        };
        socket.onerror = function() { 
          socket = undefined; 
          console.log('WS error');
        };
        socket.onmessage = function(msg){
          var data;
          try {
              data = JSON.parse(msg.data);
          } catch(exception) {
              data = msg.data;
          }     
          console.log("fromServer", data);
          console.log(callback, callback[data.cmd]);
          if(data.cmd == "play") {
            playCallback(data);
          } else if(data.cmd == "startGame") {
            startGameCallback(data);
            send({startGame2:"start"});
         } else if(data.cmd == "startGame2") {
            startGameCallback(data);
          }
        }
      }
    }

    webSocketMode();
    
    return {
        //public
        send: function(data) {
            console.log("toServer", data);
	        socket.send(JSON.stringify(data));
        },
        addStartGameCallback: function(cb) {
            startGameCallback = cb;
        },
        addPlayCallback: function(cb) {
            playCallback = cb;
        }
    }
    
})();
