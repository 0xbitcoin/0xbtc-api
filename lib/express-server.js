var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var cors = require('cors');

  var tokenData = {};
   var app;


module.exports = class ExpressServer {


 constructor(args){
   app = express();

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(cors());
   //routes(app,tokenData);

   var server = app.listen(3000, function () {
       console.log("Bot running on port", server.address().port);
   });
 }


 async updateTokenData(coinManager)
 {
   var dataArray = await coinManager.getRecentTokenDataArray()

   console.log('updating token data',dataArray);

   
   app.get("/", async function(req, res) {

       res.status(200).send( dataArray[0]);

   });

   app.get("/mining_history", async function(req, res) {
     var tokenHistoryArray = await
       res.status(200).send( dataArray);

   });


 }



}
