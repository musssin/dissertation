import Block from './Block';

class Blockchain {

  chain: Array<Block>;
  difficulty: number = 1;

  constructor() {
    this.chain = [new Block()];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(block);
  }

  isValid() {
    
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
        return false;
      }
    }

    return true;
  }

  isValidHash(hash:string) {
    const currentBlockId = this.chain.findIndex(b => b.hash === hash);
    if((currentBlockId === -1)) {
      return false;
    }
    const currentBlock = this.chain[currentBlockId];
    const prevBlock = this.chain[currentBlockId-1];
    if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
      return false;
    }
    return true;
  }
}


export default Blockchain;
