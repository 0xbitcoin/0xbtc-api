
var EthHelper = require ('./ethhelper')

var INFURA_ROPSTEN_URL = 'https://ropsten.infura.io/gmXEVo5luMPUGPqg6mhy';
var INFURA_MAINNET_URL = 'https://mainnet.infura.io/gmXEVo5luMPUGPqg6mhy';
var LOCAL_NODE_URL = 'http://localhost:8545';

const fetch = require('node-fetch');


var web3utils = require('web3-utils')

const _IDEAL_BLOCK_TIME_SECONDS = 900;
const _BLOCKS_PER_READJUSTMENT = 1024;

module.exports = class CoinHelper {





    static async  connectToContract(web3, contractAddress, contractABI, callback)
    {
      var tokenContract = EthHelper.getWeb3ContractInstance(
        web3,
        contractAddress,
        contractABI

      )

       //console.log(tokenContract)



       var name = await tokenContract.methods.name().call();
       var symbol = await tokenContract.methods.symbol().call();

       console.log('got name from web3', name )

       var difficulty = await tokenContract.methods.getMiningDifficulty().call() ;

       var latestDifficultyPeriodStarted = await tokenContract.methods.latestDifficultyPeriodStarted().call();
       var _MAXIMUM_TARGET = await tokenContract.methods._MAXIMUM_TARGET().call()
       var _MINIMUM_TARGET = await tokenContract.methods._MINIMUM_TARGET().call();
       var miningTarget = await tokenContract.methods.miningTarget().call();
       var rewardEra = await tokenContract.methods.rewardEra().call();
       var challenge_number = await tokenContract.methods.getChallengeNumber().call()  ;
       var maxSupplyForEra = await tokenContract.methods.maxSupplyForEra().call();
       var _BLOCKS_PER_READJUSTMENT = await tokenContract.methods._BLOCKS_PER_READJUSTMENT().call();
       var amountMined = await tokenContract.methods.tokensMinted().call()

       var totalSupply = await tokenContract.methods._totalSupply().call()


       var lastRewardAmount = await tokenContract.methods.lastRewardAmount().call()


       var lastRewardTo = await tokenContract.methods.lastRewardTo().call()

       var lastRewardEthBlockNumber = await tokenContract.methods.lastRewardEthBlockNumber().call()
       var latestDifficultyPeriodStarted = await tokenContract.methods.latestDifficultyPeriodStarted().call()
       //0x1d00ffff code


       var epoch_count = await tokenContract.methods.epochCount().call()

       var rewards_since_readjustment = epoch_count % _BLOCKS_PER_READJUSTMENT ;


       // Change to infura REST API here, web3.eth not working

       let data = {"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}

       var current_eth_block_response = await fetch(INFURA_MAINNET_URL, {
         method: 'post',
         header: "Content-Type: application/json",
         body: JSON.stringify(data),
       });
       var obj = await current_eth_block_response.json()
       var current_eth_block = obj.result;



       var eth_blocks_since_last_difficulty_period = current_eth_block - latestDifficultyPeriodStarted;
       var seconds_since_readjustment = eth_blocks_since_last_difficulty_period * 15;


       var seconds_per_reward = seconds_since_readjustment / rewards_since_readjustment;
       var hashrateEstimate = CoinHelper.estimateHashrateFromDifficulty(  difficulty, seconds_per_reward  )
       var hashrateEstimateDescription = CoinHelper.getHashrateDescriptionFromHashrate(  hashrateEstimate  )


      var decimals = Math.pow(10,8);
       var renderData = {
         apiVersion: '1.02',
         name: name,
         symbol: symbol,
         epochCount: epoch_count,
         contractUrl: 'https://etherscan.io/address/'+ contractAddress,
         contractAddress : contractAddress,
         decimals: decimals,
         difficulty: parseInt(difficulty),
         minimumTarget: (_MINIMUM_TARGET),
         maximumTarget: (_MAXIMUM_TARGET),
         miningTarget: (miningTarget),
         challengeNumber: challenge_number,
         rewardEra: rewardEra,
         maxSupplyForEra: parseInt(maxSupplyForEra),
         blocksPerReadjustment: parseInt(_BLOCKS_PER_READJUSTMENT),
         latestDifficultyPeriodStarted: parseInt(latestDifficultyPeriodStarted),
         circulatingSupply: (parseInt(amountMined) / decimals),
         totalSupply: (parseInt(totalSupply) / decimals),
         lastRewardTo: lastRewardTo,
         lastRewardAmount: parseInt(lastRewardAmount) / decimals,
         lastRewardEthBlockNumber: parseInt(lastRewardEthBlockNumber),
         currentEthBlock: parseInt(current_eth_block),
         ethBlocksSinceLastDifficultyPeriod: parseInt(eth_blocks_since_last_difficulty_period),
         secondsPerReward: seconds_per_reward,
         hashrateEstimate: hashrateEstimate,
         hashrateEstimateDescription: hashrateEstimateDescription,
         rewardsSinceReadjustment: rewards_since_readjustment,
       }



       callback(renderData);

    }

    static estimateHashrateFromDifficulty(difficulty, seconds_per_reward){

      //hashrate *= (_IDEAL_BLOCK_TIME_SECONDS / seconds_per_reward)


        var hashrate = web3utils.toBN(difficulty)
              .mul( web3utils.toBN(2)
              .pow(  web3utils.toBN(22) ))
              .div( web3utils.toBN(_IDEAL_BLOCK_TIME_SECONDS ))

              //???
     hashrate *= (_IDEAL_BLOCK_TIME_SECONDS / seconds_per_reward)

     return hashrate

    }

    static getHashrateDescriptionFromHashrate(hashrate)
    {
      var gigHashes = hashrate / ( parseFloat( web3utils.toBN(10).pow( web3utils.toBN(9) )) )


       return gigHashes.toFixed(2).toString() + " GH/s"

    }




}
