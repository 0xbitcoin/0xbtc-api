var INFURA_ROPSTEN_URL = 'https://ropsten.infura.io/gmXEVo5luMPUGPqg6mhy';
var INFURA_MAINNET_URL = 'https://mainnet.infura.io/gmXEVo5luMPUGPqg6mhy';
var LOCAL_NODE_URL = 'http://localhost:8545';


var Web3 = require('web3')

var web3utils = require('web3-utils')



module.exports = class EthHelper {


    constructor( arg  ){

        this.web3 = new Web3(LOCAL_NODE_URL)

        return this.connectWeb3( );
    }

    connectWeb3(web3){
      if (typeof this.web3 !== 'undefined') {


             console.log('connected to web3!')

            return this.web3;

      } else {
            console.log('web3 undefined ')
            return {}
          // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
          //this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

      }
    }




    static  getWeb3ContractInstance(web3, contract_address, contract_abi )
      {

           return new web3.eth.Contract(contract_abi,contract_address)


      }

}
