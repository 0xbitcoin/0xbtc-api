
var EthHelper = require ('./ethhelper')

var INFURA_ROPSTEN_URL = 'https://ropsten.infura.io/gmXEVo5luMPUGPqg6mhy';
var INFURA_MAINNET_URL = 'https://mainnet.infura.io/gmXEVo5luMPUGPqg6mhy';
var LOCAL_NODE_URL = 'http://localhost:8545';

const fetch = require('node-fetch');


var web3utils = require('web3-utils')

const _IDEAL_BLOCK_TIME_SECONDS = 900;
const _BLOCKS_PER_READJUSTMENT = 1024;

module.exports = class PunkHelper {




/*
    static async  connectToContract(web3, contractAddress, contractABI, callback)
    {
      var punkContract = EthHelper.getWeb3ContractInstance(
        web3,
        contractAddress,
        contractABI

      )


       var name = await punkContract.methods.name().call();



       var punkData = {
         apiVersion: '1.02',
         name: name,

       }



       callback(renderData);

    }
*/

    static async  getPunkData(web3, nextPunkIdToRead, contractAddress, contractABI, callback)
    {
      var punkContract = EthHelper.getWeb3ContractInstance(
        web3,
        contractAddress,
        contractABI

      )



       var punkIndex = nextPunkIdToRead;

       var punkOwnerAddress = await punkContract.methods.punkIndexToAddress( punkIndex ).call();


        console.log('got punk owner from web3', punkOwnerAddress )


       var punkData = {
         punkIndex:punkIndex,
         punkOwnerAddress: punkOwnerAddress
       }



       callback(punkData);

    }





}
