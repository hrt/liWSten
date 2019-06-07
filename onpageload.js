function wsOnMessage(e) {
  console.log(e)
  // here you can play with intercepted web sockets, data resides within e.detail
}

document.addEventListener('wsOnMessage', wsOnMessage);

function rigWebsockets() {
  var ws = window.WebSocket;
  window.WebSocket = function (a, b){
    var that = b ? new ws(a, b) : new ws(a);

    that.addEventListener("message", function (e)
    {
      var event = new CustomEvent("wsOnMessage", { "detail": e.data});
      document.dispatchEvent(event);
    });
    return that;
  };

  window.WebSocket.prototype = ws.prototype;
}

function injectJS(js) {
    const script = document.createElement("script");
    script.text = '(' + js.toString() + ')();';
    child = document.documentElement.appendChild(script);
    document.documentElement.removeChild(child)
}

injectJS(rigWebsockets);
