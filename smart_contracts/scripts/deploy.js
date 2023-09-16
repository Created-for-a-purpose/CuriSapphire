require('dotenv').config();

async function main() {
   const [signer] = await ethers.getSigners();
   const nonce = await signer.provider.getTransactionCount(signer.address)+3;
   
  const gasless= await ethers.deployContract("GaslessTx", [{
    addr: signer.address,
    secret: Uint8Array.from(Buffer.from(process.env.PRIVATE_KEY, 'hex')),
    nonce,
  }]);
  await gasless.waitForDeployment();

  console.log(`Gasless deployed to ${gasless.target}`);

  const data = await ethers.deployContract("Data", [gasless.target]);
  await data.waitForDeployment();

  console.log(`Data deployed to ${data.target}`);

  gasless.setDataContract(data.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
