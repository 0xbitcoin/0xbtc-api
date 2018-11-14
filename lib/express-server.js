var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");


  var tokenData = {};
   var app;


module.exports = class ExpressServer {


 constructor(args){
   app = express();

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));

   //routes(app,tokenData);

   var server = app.listen(3000, function () {
       console.log("Bot running on port", server.address().port);
   });
 }


 updateTokenData(data)
 {
   console.log('updating token data',data);
   tokenData = data;

   app.get("/", async function(req, res) {

       //var tokenData = getTokenData();


       res.status(200).send(tokenData);



   });
 }



}
