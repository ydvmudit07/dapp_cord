const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappcord", function () {
  describe("Deployment", function(){
    it("Sets the name & symbol", async () => {
      //Deploy contract
      const Dappcord = await ethers.getContractFactory("Dappcord")
      let dappcord = await Dappcord.deploy("Dappcord", "DC")
      //Fetch name
      let result = await dappcord.name()
      //Check name
      expect(result).to.equal("Dappcord")
      //Fetch symbol
      result = await dappcord.symbol()
      //Check symbol
      expect(result).to.equal("DC")
    })
  })
})
