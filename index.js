
const MongoInterface =  require('./lib/mongo-interface')

const Bree = require('bree');

var ExpressServer = require ('./lib/express-server')
 var Web3Plug = require('./lib/js/web3plug')


const Graceful = require('@ladjs/graceful');
const thread = require('bthreads');
const Cabin = require('cabin');
//var CoinManager = require ('./lib/coin-manager')
//var PunkManager = require ('./lib/punk-manager')



function init()
{
  console.log('Booting 0xBTC API bot.')



  const bree = new Bree({
    
    logger: new Cabin(),

    jobs: [
      
      // runs `./jobs/foo-bar.js` on start
      
  
      // runs `./jobs/worker-1.js` on the last day of the month
      {
        name: 'collectbasicdata',
        interval: '1h'
      },
  
      // runs `./jobs/worker-2.js` every other day
      {
        name: 'collectmints',
        interval: '5m'
      }
    ]
  })

  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();
  
  // start all jobs (this is the equivalent of reloading a crontab):
  bree.start();
  bree.run('collectbasicdata');

  //var expressServer = new ExpressServer();


  //CoinManager.init( ethConnection );
  //PunkManager.init( ethConnection  );

  var expressServer = new ExpressServer( );



}



init();
