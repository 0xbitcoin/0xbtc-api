
import Web3Plug from '../lib/js/web3plug' 
import EIP918Token from '../lib/js/eip918token' 


var assert = require('assert');

const Web3 = require('web3')

const botconfig = require('../bot.config.json')

 

var web3Plug = new Web3Plug(botconfig.web3provider);


describe('web3api', async function() {
  
    var web3 = web3Plug.getWeb3()

    let networkId = await web3Plug.getNetworkId()

    let zxbtcContractAddress = web3Plug.getContractDataForNetworkID(networkId)

    var zxbtcToken = new EIP918Token(web3, zxbtcContractAddress)




    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });




   
});