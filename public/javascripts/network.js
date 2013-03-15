var network = (function() {

    //private

    var wshost = "ws://192.168.1.33:9000/ws";

    var socket = undefined;//ws mode

    function webSocketMode(param1) {
      if(socket == undefined) {
        socket = new WebSocket(wshost);
        socket.onclose = function() { 
          socket = undefined; 
          console.log('WS closed : nbError = ', nbError); 
        };
        socket.onerror = function() { 
          socket = undefined; 
          console.log('WS error : nbError = ', nbError); 
        };
        socket.onmessage = function(msg){
          var data;
          try {
              data = JSON.parse(msg.data);
          } catch(exception) {
              data = msg.data;
          }     
          console.log("fromServer", data);
        }
      }
    }

    webSocketMode();
    
    return {
        //public
        send: function(data) {
            console.log("toServer", data);
	        socket.send(JSON.stringify(data));
        }
    }
    
})();
