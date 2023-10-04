async function main() {
  const reportVerifier = await ethers.deployContract("Groth16Verifier")
  await reportVerifier.waitForDeployment();

  console.log(`Report verifier deployed to ${reportVerifier.target}`);

  const pxVerifier = await ethers.deployContract("pxVerifier")
  await pxVerifier.waitForDeployment();

  console.log(`Px verifier deployed to ${pxVerifier.target}`);

  const ageVerifier = await ethers.deployContract("AgeVerifier")
  await ageVerifier.waitForDeployment();

  console.log(`Age verifier deployed to ${ageVerifier.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
