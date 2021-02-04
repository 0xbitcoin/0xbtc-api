var Web3Plug = require('../lib/js/web3plug')
const MongoInterface =  require('../lib/mongo-interface')


const botconfig = require('../bot.config.json')

  var web3Plug = new Web3Plug(botconfig.web3provider);

  var mongoInterface = new MongoInterface()
  mongoInterface.init('api-0xbtc', botconfig.mongoConfig)