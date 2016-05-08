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
      onConnection(socket);

      socket.on('message', function(message) {
        onMessage(socket, message)
      });

      socket.on('disconnect', function() {
        onClose(socket)
      });
    });
  }

});

var connections = [];

function onConnection(socket) {
  connections.push(socket.id);
  socket.emit('user-connection', {connections: connections});
  socket.broadcast.emit('user-connection', {connections: connections});
}

function onClose(socket) {
  connections = connections.filter(function(connection) {
    return connection !== socket.id;
  });
  socket.broadcast.emit('user-connection', {connections: connections});
}

function onMessage(socket, message) {
  socket.emit('user-message', message);
  socket.broadcast.emit('message', {
    text: message.text,
    isOwner: false
  });
}
