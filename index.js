
const MongoInterface =  require('./lib/mongo-interface')

var ExpressServer = require ('./lib/express-server')
var Web3Plug = require('./lib/web3plug')

const botconfig = require('./bot.config.json')


//var CoinManager = require ('./lib/coin-manager')
//var PunkManager = require ('./lib/punk-manager')



function init()
{
  console.log('Booting 0xBTC API bot.')


  var web3Plug = new Web3Plug();

  var mongoInterface = new MongoInterface()
  mongoInterface.init('api-0xbtc', botconfig.mongoConfig)

  //var expressServer = new ExpressServer();


  //CoinManager.init( ethConnection );
  //PunkManager.init( ethConnection  );

  var expressServer = new ExpressServer( );



}



init();
