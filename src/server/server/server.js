var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function(err) {
  if (err) {
    throw err;
  }

  if (require.main === module) {
    var io = require('socket.io')(app.start());
    io.on('connection', function(socket) {
      console.log('Server connected.');
      socket.on('message', (message) => onMessage(socket, message));
    });
  }

});

function onMessage(socket, message) {
  socket.emit('user-message', message);
  socket.broadcast.emit('message', {text: message.text, isOwner: false});
}
