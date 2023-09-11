async function main() {

  const data = await ethers.deployContract("Data");
  await data.waitForDeployment();

  console.log(`Data deployed to ${data.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
