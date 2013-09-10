(function() {
  var assemblies = {
    "ERJ190": [
        {  "code":"ERJ190", "name":"Embraer ERJ190", "positions": "1", "class": "ROOT", "parentCode": null },
          {	"code":"05", "name":"TIME LIMITS/MAINTENANCE CHECKS", "positions": "1", "class": "SYS", "parentCode": "ERJ190" }
    ]  
  };
  var roles = {
    LINETECH: {
      "roleList": [
        {
          "code": "LINETECH",
          "name": "Line Technician",
          "todoLists": [
            {
              "title": "Line Technician",
              "name": "Line Technician To Do List",
              "description": "This is the main list for the line technician (LINETECH) role.",
              "tabs": [ "10003" ],
              "buttons": [ "10043" ],
              "menuItems": [ "10110" ]
            }
          ],
          "actions": [    
            "ACTION_ACKNOWLEDGE_ALERT"
          ]
        }
      ]
    }
  };

  module.exports.assemblies = assemblies;
  module.exports.roles = roles;

}());