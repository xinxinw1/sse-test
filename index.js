var express = require("express");
var app = express();

app.use(express.static(__dirname + '/'));

var testdata = "This is my message";

app.get('/connect', function(req, res){
    res.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });

    var v = setInterval(function(){
      console.log('writing ' + testdata);
      res.write('data: {"msg": '+ testdata +'}\n\n');
    }, 1000);
    
    setTimeout(function () {
      clearInterval(v);
      res.end();
    }, 5000);
});

var port = process.env.PORT || 8003;
app.listen(port, function() {
  console.log("Running at Port " + port);
});

