
var EthHelper = require ('./lib/ethhelper')
var ExpressServer = require ('./lib/express-server')


//var mongoInterface = require('./lib/mongo-interface')


function init()
{
  console.log('Booting 0xBTC API bot.')


  //every 60 seconds, update the data using Infura



     //run immediately
     var web3 = new EthHelper();

     var expressServer = new ExpressServer();


  setInterval(function(){ 


        EthHelper.connectToContract(web3 ,async function(data){
          expressServer.updateTokenData(data)
        }  )

   }, 60*1000);



   EthHelper.connectToContract(web3 ,async function(data){
     expressServer.updateTokenData(data)
   }  )

  //start express



}



init();
