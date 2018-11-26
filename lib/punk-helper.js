
var EthHelper = require ('./ethhelper')

var INFURA_ROPSTEN_URL = 'https://ropsten.infura.io/gmXEVo5luMPUGPqg6mhy';
var INFURA_MAINNET_URL = 'https://mainnet.infura.io/gmXEVo5luMPUGPqg6mhy';
var LOCAL_NODE_URL = 'http://localhost:8545';

const fetch = require('node-fetch');


var web3utils = require('web3-utils')


module.exports = class PunkHelper {



    static async  getPunkData(web3, nextPunkIdToRead, contractAddress, contractABI, callback)
    {
      let punkContract = EthHelper.getWeb3ContractInstance(
        web3,
        contractAddress,
        contractABI

      )



       var punkIndex = nextPunkIdToRead;

       var punkOwnerAddress = await punkContract.methods.punkIndexToAddress( punkIndex ).call();


        console.log('got punk owner from web3', punkOwnerAddress.toLowerCase() )


       var punkData = {
         punkIndex:punkIndex,
         punkOwnerAddress: punkOwnerAddress.toLowerCase()
       }

       punkContract = null;

       callback(punkData);

    }





}
