var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var cors = require('cors');

  var tokenData = {};
   var app;


module.exports = class ExpressServer {


 constructor(coinManager,punkManager){
   app = express();

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(cors());

   app.use(express.static('public'))

   ExpressServer.defineRoutes(app, coinManager,punkManager)


   var server = app.listen(3000, function () {
       console.log("Bot running on port", server.address().port);
   });






 }


 static async  defineRoutes(app, coinManager,punkManager)
 {




   app.get("/", async function(req, res) {
      var dataArray = await coinManager.getRecentCoinDataArray()
       res.status(200).send( dataArray[0]);

   });

   app.get("/mining_history", async function(req, res) {
      var dataArray = await coinManager.getRecentCoinDataArray()
     var tokenHistoryArray = await
       res.status(200).send( dataArray);

   });

   app.get("/punks", async function(req, res) {

     var punksArray = await punkManager.getPunkDataArray()

     var result = await
       res.status(200).send( punksArray);

   });

   app.get("/punks_of_owner/:address", async function(req, res) {
     var params = req.params
     var requestedOwnerAddress = params.address.toLowerCase()

     var punksArray = await punkManager.getPunkDataArray()

     var ownersPunksArray = punksArray.filter(i => i.punkOwnerAddress == requestedOwnerAddress)

     var result = await
       res.status(200).send( ownersPunksArray);

   });





 }








}
