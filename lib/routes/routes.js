//Routes for express
var appRouter = function (app,tokenData) {
  app.get("/", async function(req, res) {

      //var tokenData = getTokenData();


      res.status(200).send(tokenData);



  });
}


function getTokenData()
{

  //retrieve data from Mongo


  return {
    name: '0xBTC'



  }
}


module.exports = appRouter;
