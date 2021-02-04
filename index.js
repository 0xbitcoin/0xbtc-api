
var ExpressServer = require ('./lib/express-server')
var EthConnection = require('./lib/ethconnection')

const botconfig = require('../bot.config.json')


//var CoinManager = require ('./lib/coin-manager')
//var PunkManager = require ('./lib/punk-manager')

 var mongoInterface = require('./lib/mongo-interface')

function init()
{
  console.log('Booting 0xBTC API bot.')


  var ethConnection = new EthConnection();

  mongoInterface.init('api-0xbtc', botconfig.mongoConfig)

  //var expressServer = new ExpressServer();


  //CoinManager.init( ethConnection );
  //PunkManager.init( ethConnection  );

  var expressServer = new ExpressServer( );



}



init();
