
var ExpressServer = require ('./lib/express-server')
var EthHelper = require('./lib/ethhelper')

var CoinManager = require ('./lib/coin-manager')
var PunkManager = require ('./lib/punk-manager')

//var mongoInterface = require('./lib/mongo-interface')

function init()
{
  console.log('Booting 0xBTC API bot.')


  var web3 = new EthHelper();

  //var expressServer = new ExpressServer();


  CoinManager.init( web3 );
  PunkManager.init( web3  );

  var expressServer = new ExpressServer(CoinManager, PunkManager);



}



init();
