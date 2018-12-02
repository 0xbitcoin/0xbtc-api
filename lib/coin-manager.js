var RedisInterface = require ('./redis-interface')

var EthHelper = require ('./ethhelper')

var CoinHelper = require ('./coin-helper')





var deployedContractInfo = require('./contracts/DeployedContractInfo.json');
var _0xBitcoinContract = require('./contracts/_0xBitcoinToken.json');



module.exports =  {



    async init(web3   )
    {
        var self = this ;


        await RedisInterface.init();


        setInterval(function(){

          self.updateTokenData( web3  )

        }, 30*1000);

       self.updateTokenData( web3  )

    },


    async updateTokenData( web3 )
    {
      var self = this;

          CoinHelper.connectToContract(web3, self.getContractAddress(), self.getContractABI(),  async function(data){



         await self.storeCoinData(data)

        // await  expressServer.updateCoinData(self)


      }  )



    },


      //store data in redis
      async storeCoinData(data)
      {


        await  RedisInterface.storeRedisHashData('token_data', data.epochCount, JSON.stringify(data))



      },


      async getRecentCoinDataArray()
      {

         var hashArray = await RedisInterface.getResultsOfKeyInRedis('token_data')

          var dataArray = [];

          for(i in hashArray){
            var hash = hashArray[i];

            var coinData = await RedisInterface.findHashInRedis('token_data',hash)
            dataArray.push( JSON.parse(coinData) )
          }

          hashArray = null;


          return dataArray;
      },

      getContractAddress()
    {
       return deployedContractInfo.networks.mainnet.contracts._0xbitcointoken.blockchain_address;
    },

      getContractABI()
    {
       return _0xBitcoinContract.abi;
    }






}
