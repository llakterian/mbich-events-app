const hre = require("hardhat");

async function main() {
  const EventManagement = await hre.ethers.getContractFactory("EventManagement");
  const eventManagement = await EventManagement.deploy();
  await eventManagement.waitForDeployment();
  
  const address = await eventManagement.getAddress();
  console.log("EventManagement deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
