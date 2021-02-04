
const Web3Plug = require('../lib/js/web3plug') 
const EIP918Token = require('../lib/js/eip918token') 

const chai = require('chai')

chai.config.includeStack = true;
chai.use(require('chai-as-promised'))
  
var assert = chai.assert
 

const Web3 = require('web3')

const botconfig = require('../bot.config.json')

 

var web3Plug = new Web3Plug(botconfig.web3provider);

  

describe('web3api',  () => {
  


        it('Should api stuff', async () => {

            var web3 = web3Plug.getWeb3()

            let networkId = await web3Plug.getNetworkId()

            let blockNumber = await web3Plug.getBlockNumber()

            console.log('networkId',networkId) 
            console.log('blockNumber',blockNumber) 


            let zxbtcContractAddress = web3Plug.getContractDataForNetworkID(networkId)._0xbitcointoken.address

            console.log('zxbtcContractAddress',zxbtcContractAddress)

            var zxbtcToken = new EIP918Token(web3, zxbtcContractAddress)
             

            let difficulty = await zxbtcToken.getMiningDifficulty()
               console.log('difficulty',difficulty)

               let mints = await zxbtcToken.getMintHistory('11000000')
               console.log('mints',mints.length)
        
                assert.equal(parseInt(difficulty), 1519206521);



         }); 




   
});