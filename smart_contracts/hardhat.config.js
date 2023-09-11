require("@nomicfoundation/hardhat-toolbox");
require ('@oasisprotocol/sapphire-hardhat');
// require dotenv
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
        sapphire_testnet: {
          url: "https://testnet.sapphire.oasis.dev",
          accounts: process.env.PRIVATE_KEY
            ? [process.env.PRIVATE_KEY]
            : [],
          chainId: 0x5aff,
        },
      },
  solidity: "0.8.19",
};
