var RedisInterface = require ('./redis-interface')

var EthHelper = require ('./ethhelper')

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

      EthHelper.connectToContract(web3 ,async function(data){
        expressServer.updateTokenData(data)
        console.log(data)
      }  )

    },



}
