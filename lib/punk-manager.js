var RedisInterface = require ('./redis-interface')

var EthHelper = require ('./ethhelper')
var CoinHelper = require ('./coin-helper')







var deployedContractInfo = require('./contracts/DeployedContractInfo.json');
var cryptopunksContract = require('./contracts/cryptopunks.json');



module.exports =  {



    async init(  expressServer  )
    {
        var self = this ;

        var web3 = new EthHelper();


      setInterval(function(){

        self.updatePunkData( web3 , expressServer)

       }, 60*1000);

     self.updatePunkData( web3 , expressServer)

    },


    async updatePunkData( web3 , expressServer)
    {

      CoinHelper.connectToContract(web3, this.getContractAddress(), this.getContractABI(),  async function(data){
        expressServer.updateTokenData(data)
        console.log(data)
      }  )

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
