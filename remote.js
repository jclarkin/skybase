(function() {
  var request = require('request');
  var url = require('url');
  var data = require('./data');
    
  var init = function(app, config) {

    // Routes for Remote Integrations
    app.post('/api/createConfigSlot', function(req, res) {
      req.pipe(request(config.url + config.api.createConfigSlot)).pipe(res);
    });
    app.post('/api/createAssembly', function(req, res) {
      req.pipe(request(config.url + config.api.createAssembly)).pipe(res);
    });
    app.get('/api/assy/create', function(req, res) {
      var assyCode = url.parse(req.url, true).query.assyCode;
      
      var slots = data.assemblies[assyCode];
      
      var assemblies = {
        assemblyList: [{
          assemblyClass: "ACFT",
          code: slots[0].code,
          name: slots[0].name
        }]
      };
      
      request({
        url: config.url + config.api.createAssembly,
        method: "POST",
        auth: config.auth,
        headers: config.headers,
        body: JSON.stringify(assemblies)
      }, function(slots) { return function(error, response, body) {
        if (!error) {
          console.log("Assembly created");
          //console.log(response);
          console.log(body);
              
          //create config slots
          var configSlots = {
            configSlotList: []
          };
          
          for (var i=1; i < slots.length; i++) {
            configSlots.configSlotList.push({
              assemblyCode: slots[0].code,
              code: slots[i].code,
              configSlotClass: slots[i].class,
              name: slots[i].name,
              parentCode: slots[i].parentCode,
              positions: slots[i].positions 
            })
          }
          
          request({
            url: config.url + config.api.createConfigSlot,
            method: "POST",
            auth: config.auth,
            headers: config.headers,
            body: JSON.stringify(configSlots)
          }, function(error, response, body) {
            if (!error) {
              res.end('{ "result": "SUCCESS" }');
              console.log("Config slots created");
              console.log(body);
            } else {
              res.end('{ "result": "FAILURE" }');
              console.log("Failure while creating config slots: " + error);
            }
          });
        } else {
          res.end('{ "result": "FAILURE" }');
          console.log("Failure while creating assembly: " + error);
        }
      }; }(slots));
    });
    app.get('/api/role/create', function(req, res) {
      var roleCode = url.parse(req.url, true).query.roleCode;
      
      request({
        url: config.url + config.api.createRole,
        method: "POST",
        auth: config.auth,
        headers: config.headers,
        body: JSON.stringify(data.roles[roleCode])
      }, function(error, response, body) {
        res.end('{ "result": "SUCCESS" }');
        console.log("Role created");
        console.log(body);
      });
    });

    // Mock end points for Remote Server
    app.post('/' + config.api.createConfigSlot, function(req, res) {
      res.setHeader("Content-Type", "application/json");
      res.end('{ "result": "SUCCESS" }');
      console.log('Mock end point called at: /' + config.api.createConfigSlot);
    });
    app.post('/' + config.api.createAssembly, function(req, res) {
      res.setHeader("Content-Type", "application/json");
      res.end('{ "result": "SUCCESS" }');
      console.log('Mock end point called at: /' + config.api.createAssembly);
    });
    app.post('/' + config.api.createRole, function(req, res) {
      res.setHeader("Content-Type", "application/json");
      res.end('{ "result": "SUCCESS" }');
      console.log('Mock end point called at: /' + config.api.createRole);
    });
      
  }

  module.exports.init = init;

}());