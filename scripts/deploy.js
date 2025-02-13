async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
  
    const EventManagement = await ethers.deployContract("EventManagement");
    await EventManagement.waitForDeployment();
  
    const address = await EventManagement.getAddress();
    console.log("EventManagement deployed to:", address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  