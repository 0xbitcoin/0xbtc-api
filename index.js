
var ExpressServer = require ('./lib/express-server')


var CoinManager = require ('./lib/coin-manager')

//var mongoInterface = require('./lib/mongo-interface')

function init()
{
  console.log('Booting 0xBTC API bot.')


  var expressServer = new ExpressServer();

  //every 60 seconds, update the data using Infura

  CoinManager.init( expressServer );


  //start express



}



init();
