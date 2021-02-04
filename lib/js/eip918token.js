
const eip918ABI = require('../contracts/eip918abi.json')

module.exports = class EIP918Token {
    constructor(web3, contract_address) {
      this._web3 = web3;
      this._contract_address = contract_address;
 
      this._contract = new web3.eth.Contract(eip918ABI,contract_address);
    }
    getContract(){
        return this._contract
    }
    
     getValues() {
      return this.states;
    }
    async getMiningDifficulty() {
      return this._contract.methods.getMiningDifficulty().call()
    }
     getLatestDifficultyPeriodStarted() {
      return this._latestDifficultyPeriodStarted;
    }
     getTokensMinted() {
      return this._tokensMinted;
    }
     getMaxSupplyForEra() {
      return this._maxSupplyForEra;
    }
     getLastRewardEthBlockNumber() {
      return this._lastRewardEthBlockNumber;
    }
     getRewardEra() {
      return this._rewardEra;
    }
     getMiningReward() {
      return this._getMiningReward;
    }
     getEpochCount() {
      return this._epochCount;
    }
     getTotalSupply() {
      return this._totalSupply;
    }  



    
     async getMintHistory(fromBlock, toBlock){
        
        //myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'    Using an array means OR: e.g. 20 or 23

            return await this._contract.getPastEvents('Mint', {
                filter: {}, 
                fromBlock: fromBlock,
                toBlock: toBlock //'latest'
            } ) 
 
    }


    printValuesToLog() {
      this.states.forEach((value) => {
        log('block #', value[0], 'ts', value[2], 'value[1]:', (value[1]).toString(10));
      });
    }
    /* fetch query_count states between start_block_num and end_block_num */
    addValuesInRange(start_block_num, end_block_num, query_count) {
      var stepsize = (end_block_num-start_block_num) / query_count;
  
      for (var count = 0; count < query_count; count += 1) {
        this.addValueAtEthBlock(end_block_num - (stepsize*count));
      }
    }

}