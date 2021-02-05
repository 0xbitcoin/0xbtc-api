
/*
Start at the beginning of time, the 0xBTC deploy block 

*/


const EIP918Token = require('../lib/js/eip918token') 

var Web3Plug = require('../lib/js/web3plug')
const MongoInterface =  require('../lib/mongo-interface')


const botconfig = require('../bot.config.json')

var web3Plug = new Web3Plug(botconfig.web3provider);

async function collectMints(){

  let mongoInterface = new MongoInterface( 'api_0xbtc' )

  let networkId = await web3Plug.getNetworkId()
  const latestBlockNumber = await web3Plug.getBlockNumber()

  let zxbtcContractData = web3Plug.getContractDataForNetworkID(networkId)._0xbitcointoken 
  const deployedAtBlock = zxbtcContractData.deployedat 

  const blockInterval = 10000

  let complete = false 
  
  var web3 = web3Plug.getWeb3()
  var zxbtcToken = new EIP918Token(web3, zxbtcContractData.address)


  var searchStartBlock = null

  if(deployedAtBlock == null ){
    console.error("deployedAtBlock == null")
    return 
  }

  while(true){
    if(searchStartBlock == null ){
      searchStartBlock = parseInt(deployedAtBlock)
    }else{
      searchStartBlock = parseInt(searchStartBlock) + parseInt(blockInterval)
    }

    let searchEndBlock = parseInt(searchStartBlock) + blockInterval - 1 ;

    if(searchEndBlock > latestBlockNumber){
      searchEndBlock = latestBlockNumber
    }

    let existingRecord = await mongoInterface.findOne('mintHistorySearch', {"startBlock": searchStartBlock} )

    if( !existingRecord ){

      console.log('Finding mints between blocks ', searchStartBlock, searchEndBlock, '...')

      let mints = []
      
      try {
        mints = await zxbtcToken.getMintHistory(searchStartBlock , searchEndBlock)
      }catch(e){
        console.error(e)
      }
      
      console.log('Found '+ mints.length +' mints.', )


      let newMintHistorySearch = {
        "startBlock": searchStartBlock,
        "endBlock": searchEndBlock,
        "mintCount": mints.length,
        "mints": mints  
      }

      for(mint of mints){
        await mongoInterface.upsertOne('mint', {"id": mint.id} , mint)
      }


      await mongoInterface.upsertOne('mintHistorySearch', {"startBlock": searchStartBlock} , newMintHistorySearch)

    } 

    if( searchEndBlock >= latestBlockNumber){
      console.log("Finished collecting mints.")
      break; //break while loop
    }
  }
  


  
}
 




  collectMints();