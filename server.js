// *******************************************************
// expressjs template
//
// assumes: npm install express
// defaults to jade engine, install others as needed
//
// assumes these subfolders:
//   public/
//   public/javascripts/
//   public/stylesheets/
//   views/
//
var express = require('express');
var remote = require('./remote');

var app = express();
var viewEngine = 'jade'; // modify for your view engine

//define process in case we are running locally
//var process = process || { env: { PORT: 1337, IP: 'localhost' } };

var remoteServerConfig = {
  'url' : 'http://skybase.jclarkin.c9.io/',
  'auth': {
    'user': 'jclarkin',
    'pass': 'password'
  },
  'headers': {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  'api' : {
    'createConfigSlot': 'api/action/maintenance/eng/config/slot/create/v1',
    'createAssembly':   'api/action/maintenance/eng/config/assy/create/v1',
    'createRole':       'api/action/erp/hr/role/create/v1'
  }
};

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', viewEngine);
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'M61374746987491'}));  
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Logic for Authentication
function checkAuth(req, res, next) {
  if(req.session && req.session.userid) {
    next();
  } else {
    res.status(401);
    res.render('login', {
        place: null
    });    
  }
}



var renderIndex = function(req, res){
    res.render('index', {
        place: 'index'
    });
};

// Routes for UI
app.get('/', renderIndex);
app.get('/index.html', renderIndex);
app.get('/assemblies.html', function(req, res) {
    res.render('assemblies', {
        place: 'assemblies'
    });
});
app.get('/roles.html', function(req, res) {
    res.render('roles', {
        place: 'roles'
    });
});
app.get('/about.html', function(req, res) {
    res.render('about', {
        place: 'about'
    });
});
app.get('/contact.html', function(req, res) {
    res.render('contact', {
        place: 'contact'
    });
});

// Routes for actions
app.get('/login', function(req, res) {
    //
});

// Setup Remote Server Connections
remote.init(app, remoteServerConfig);

// Application Configuration Setup
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});
app.listen(process.env.PORT, process.env.IP);
console.log("Server started at http://" + process.env.IP + ":" + process.env.PORT)
// *******************************************************