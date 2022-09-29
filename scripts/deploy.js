const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('DubID');
  const domainContract = await domainContractFactory.deploy("Dubtech");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("AShley",  {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();
  console.log("Minted domain Ashley.Dubtech");

  txn = await domainContract.setRecord("Ashley");
  await txn.wait();
  console.log("Set record for Ashley.Dubtech");

  const address = await domainContract.getAddress("banana");
  console.log("Owner of DubId:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();