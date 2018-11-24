var RedisInterface = require ('./redis-interface')

var EthHelper = require ('./ethhelper')




var deployedContractInfo = require('./contracts/DeployedContractInfo.json');
var _0xBitcoinContract = require('./contracts/_0xBitcoinToken.json');



module.exports =  {



    async init(  expressServer  )
    {
        var self = this ;

        var web3 = new EthHelper();


      setInterval(function(){

        self.updateTokenData( web3 , expressServer)

       }, 60*1000);

     self.updateTokenData( web3 , expressServer)

    },


    async updateTokenData( web3 , expressServer)
    {

      EthHelper.connectToContract(web3, this.getContractAddress(), this.getContractABI(),  async function(data){
        expressServer.updateTokenData(data)
        console.log(data)
      }  )

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
