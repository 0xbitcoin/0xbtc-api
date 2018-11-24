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

         }, 60*1000);

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

        let key = 'token_data'

        var mostRecentStoredDataJSON = await RedisInterface.peekFirstFromRedisList(key)
        var mostRecentStoredData = JSON.parse( mostRecentStoredDataJSON )


        if( mostRecentStoredData == null || data.epochCount != mostRecentStoredData.epochCount)
        {
          await  RedisInterface.pushToRedisList(key, JSON.stringify(data))


        }


      },


      async getRecentCoinDataArray()
      {
          var dataArray = await RedisInterface.getRecentElementsOfListInRedis('token_data', 100)

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
