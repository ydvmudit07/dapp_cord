const hre = require("hardhat")
//Added dependency
const ethers = require("ethers")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  //Setting up account and variables

  let [deployer] = await ethers.getSigners()
  const NAME = 'Dappcord'
  const SYMBOL = 'DC'

  //Deploy contract

  const Dappcord = await ethers.getContractFactory("Dappcord")  
  const dappcord = await Dappcord.deploy(NAME, SYMBOL)
  await dappcord.deployed()

  console.log(`Deployed Dappcord Contract at: ${dappcord.address}\n`)

  //Deployment goes here

  const CHANNEL_NAMES = ['general', 'intro', 'jobs']
  const COSTS = [tokens(1), tokens(0), tokens(0.25)]

  for(var i = 0; i < 3; i++){
    const transaction = await dappcord.connect(deployer).createChannel(CHANNEL_NAMES[i], COSTS[i])
    await transaction.wait()

    console.log(`Created text channels ${CHANNEL_NAMES[i]}`)
  }


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});