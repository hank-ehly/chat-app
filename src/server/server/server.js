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

      socket.on('add-chat-user', function(user) {
        addChatUserForSocket(user, socket);
      });

      socket.on('message', function(message) {
        onMessage(socket, message)
      });

      socket.on('disconnect', function() {
        onClose(socket)
      });
    });
  }

});

var User = function(name, id) {
  this.name = name;
  this.id = id;
};

function onConnection(socket) {
  socket.emit('connections-update');
  socket.broadcast.emit('connections-update');
}

function addChatUserForSocket(user, socket) {
  var newUser = new User(user.name, socket.id);
  socket.emit('add-chat-user', newUser);
  socket.broadcast.emit('add-chat-user', newUser);
}

function onClose(socket) {
  socket.broadcast.emit('connections-update');
}

function onMessage(socket, message) {
  socket.emit('message', message);
  socket.broadcast.emit('message', message);
}
