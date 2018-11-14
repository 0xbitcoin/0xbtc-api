var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");



module.exports = class ExpressServer {

 constructor(args){
   var app = express();

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));

   routes(app);

   var server = app.listen(3000, function () {
       console.log("Bot running on port", server.address().port);
   });
 }



}
