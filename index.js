
var EthHelper = require ('./lib/ethhelper')
var ExpressServer = require ('./lib/express-server')


//var mongoInterface = require('./lib/mongo-interface')

function init()
{
  console.log('Booting 0xBTC API bot.')
  var ethHelper = new EthHelper();
  var expressServer = new ExpressServer();


  //start express

}



init();
