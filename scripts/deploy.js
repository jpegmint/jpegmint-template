// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    await hre.run("compile");

    [owner] = await ethers.getSigners();

    const contractName = "NftContract";
    console.log(`Deploying ${contractName}...`);
    const contractFactory = await ethers.getContractFactory(contractName);
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log(`Deployed ${contractName} at: `, contract.address, '\n');
}
  
main()
.then(() => {
    console.log("Completed deployment.", '\n');
    process.exit(0);
})
.catch(error => {
    console.error(error);
    process.exit(1);
});
