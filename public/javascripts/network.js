var network = (function() {

    var wshost = "ws://192.168.1.28:9000/ws";
    var socket = undefined;//ws mode
    var callbacks = {};
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
          if(callbacks[data.cmd] != undefined) {
            callbacks[data.cmd](data);
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
      onCmd: function(cmdName, cb) {
        callbacks[cmdName] = cb;
      }
    }
    
})();
