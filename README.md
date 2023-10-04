# CuriSapphire (Submitted to Privacy for Web3 Hackathon)
### Your Health, Your Data, Your Control 🛂
CuriSapphire empowers user privacy by leveraging the Sapphire paratime and ZKPs. Enhanced privacy and tokenized data allow us to help create the first-ever responsible data economy.

## Getting Started
![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/ebc7200c-c650-439a-9a1b-66baa1b8a3b9)

Select your role, enter your details and experience a smooth and gasless onboarding process.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/4f3ae1a3-3678-4f50-8e1a-400651c972c3)
![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/58df8f0f-a52e-41a9-9353-ba055a540926)

Gasless transactions are implemented throught a Gasless Proxy Contract (Proxy.sol) which implements an on-chain signer.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/bf110262-63d6-4ee5-ba1a-5f7dcef90c99)

User details, labs reports and prescriptions are going to be available in the dashboard section. You will be asked to make a signature to verify that you are indeed who you claim to be for data retrieval from the chain. 
This signature will be kept in the Context API for reuse until the next re-render.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/51acd56f-f9ab-43f2-8532-6849997e9aaf)

## Patient-Doctor interactions
In some cases, the doctor might need to see your (patient's) medical history for prescribing medications. But, sharing something like your medical history can seem like giving away a lot of private information.
So, is there any way you could prove some statements to your doctor so that they may take well informed decisions and you do not have to compromise your privacy? Yes, the answer is Zero Knowledge Proofs (ZKPs).
You can generate ZKPs to verify some of the doctor's requests while maintaining confidentiality. ZK proofs are implemented using the snarkjs library and circom circuits.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/169c9879-d288-419c-8c26-b854e0e620d8)

After generating proofs, you can share your latest lab report data with your doctor through data tokenization, implemented by the Tokenization.sol smart contract. A token will be issued by you to your doctor,
and will have limited time validity after which it becomes in-accessible. 

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/64295217-e5ec-4cdd-b65d-04ac65777052)

## Patient-Pharmacy interaction
Sharing details such as prescription issue date, issuer of prescription, etc. can compromise patient privacy. Instead, you can generate ZKPs to prove that your issued prescription is still valid without revealing 
the exact dates of issue. 

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/7cceecfc-aaa6-4305-b6ac-eef3cba039f3)

After verifying the generated proofs, your medicine and dosage details will be tokenized on your confirmation and shared with the pharmacy for medication orders. The tokenized data will be accessible for a limited
amount of time.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/030a67b4-edfc-488d-b901-68f154d1ce91)

As not all medicines require a prescription, we have used an AI model to decode your intent and extract information from it to place medication orders.
![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/d62b9fce-cb53-4c3e-8b34-515b989dc6de)
![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/9e3d5fa9-9ad0-43e0-8b5d-293a82a9b70c)

## Creating a responsible data economy
### Tokenized data opens use-cases where data providers can benefit financially from their data contribution.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/49a50705-4f81-40f3-9c74-5f1d72b8e383)

People like researchers, are in the need of medical data for their research purposes and medical analysis. They can provide financial incentives to the data providers in exchange of their data for a fixed amount of 
time. The data provider can stake their data for this time and earn stake rewards.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/6e82cbd3-787b-4dec-bec5-8b00a7c07808)

The data provider can check if they meet the researcher's prime requirements by generating and verifying ZKPs and not having to reveal their data just for verification. After successful verification of the proofs, the data
provider can stake their data for the given amount of time and accepting the stake reward proposed by the researcher.

![image](https://github.com/Created-for-a-purpose/CuriSapphire/assets/97793907/bfb0f891-7d5f-495a-b3f7-d2dec4a552b4)

That's all for now, folks!

## Instructions to setup the project locally
1. Clone this repo
2. Go to directory "frontend" and execute "npm install --force"
3. Run the node.js server in the "ZKP" directory through "node index.js"
4. Execute "npm start" in the frontend directory, connect your wallet and that's it!





