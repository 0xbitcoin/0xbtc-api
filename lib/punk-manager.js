var RedisInterface = require ('./redis-interface')

var EthHelper = require ('./ethhelper')
var PunkHelper = require ('./punk-helper')




var deployedContractInfo = require('./contracts/DeployedContractInfo.json');
var cryptopunksContract = require('./contracts/cryptopunks.json');

var nextPunkIdToRead = 0;

module.exports =  {



    async init( web3  )
    {
        var self = this ;



      setInterval(async function(){

       await self.updatePunkData( web3 , nextPunkIdToRead  )

         nextPunkIdToRead++;

        if(nextPunkIdToRead > 9999) nextPunkIdToRead = 0;

      }, 500);

    // self.updatePunkData( web3 , expressServer)

    },


    async updatePunkData( web3 , nextPunkIdToRead )
    {
      var self = this;

      PunkHelper.getPunkData(web3, nextPunkIdToRead, self.getContractAddress(), self.getContractABI(),  async function(data){

        await self.storePunkData(data.punkIndex,data)
      //  await expressServer.updatePunkData(self)

      }  )

    },

    //store data in redis
    async storePunkData(punk_id,data)
    {

      let key = 'punk_data'

      await  RedisInterface.storeRedisHashData(key, punk_id, JSON.stringify(data))

    },


    async getPunkDataArray()
    {
        var hashArray = await RedisInterface.getResultsOfKeyInRedis('punk_data')

        var punksArray = [];

        for(i in hashArray){
          var hash = hashArray[i];

          var punkData = await RedisInterface.findHashInRedis('punk_data',hash)
          punksArray.push( JSON.parse(punkData) )
        }


        return punksArray;
    },


      getContractAddress()
    {
       return deployedContractInfo.networks.mainnet.contracts.cryptopunks.blockchain_address;
    },

      getContractABI()
    {
       return cryptopunksContract.abi;
    }






}
