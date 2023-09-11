export const dataAddress = "0x09C69674E00C2309C587DA578447cD36669A7aF2"
export const dataAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_license",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "addHospitalData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_bloodGroup",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "addPatientData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_license",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        }
      ],
      "name": "addPharmacyData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getPatientData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "access",
              "type": "address[]"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "bloodGroup",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_address",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "contact",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            }
          ],
          "internalType": "struct Data.patientData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "giveAccess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hospitals",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "license",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "patients",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "bloodGroup",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "pharmacies",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "license",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "contact",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
