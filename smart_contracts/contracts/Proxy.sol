// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {EIP155Signer} from "@oasisprotocol/sapphire-contracts/contracts/EIP155Signer.sol";
import {Sapphire} from "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface IData {
    struct patientData {
        address owner;
        address[] access;
        string name;
        uint256 age;
        string bloodGroup;
        string _address;
        string contact;
        string email;
    }

    function getPatientData(
        address patient
    ) external view returns (patientData memory);

    function proxy_giveAccess(address to) external;

    function proxy_addPatientData(
        address owner,
        string memory _name,
        uint256 _age,
        string memory _bloodGroup,
        string memory _address,
        string memory _contact,
        string memory _email
    ) external;

    function proxy_addPharmacyData(
        string memory _name,
        string memory _license,
        string memory _address,
        string memory _contact,
        string memory _email
    ) external;

    function proxy_addHospitalData(
        string memory _name,
        string memory _license,
        string memory _address,
        string memory _contact,
        string memory _email
    ) external;
}

struct EthereumKeypair {
    address addr;
    bytes32 secret;
    uint64 nonce;
}

struct EthTx {
    uint64 nonce;
    uint256 gasPrice;
    uint64 gasLimit;
    address to;
    uint256 value;
    bytes data;
    uint256 chainId;
}

struct txRequest {
    address owner;
    string name;
    uint256 age;
    string bloodGroup;
    string _address;
    string contact;
    string email;
}

contract GaslessTx {
    EthereumKeypair private kp;
    bytes32 private immutable encryptionSecret;

    IData public dataProxy;

    constructor(EthereumKeypair memory keypair) payable {
        encryptionSecret = bytes32(Sapphire.randomBytes(32, ""));
        kp = keypair;
    }

    modifier verifiedOnly(bytes memory signature, address owner) {
        require(checkValidity(signature, owner), "invalid signature");
        _;
    }

    // this prevents stack too deep error, as internal functions are not counted in stack
    function checkValidity(
        bytes memory signature,
        address owner
    ) internal pure returns (bool) {
        bytes32 sigHash = getSigHash(owner);
        bytes32 ethSignedHash = ECDSA.toEthSignedMessageHash(sigHash);
        address signer = ECDSA.recover(ethSignedHash, signature);
        return signer == owner;
    }

    function setDataContract(address _dataProxy) external {
        require(address(dataProxy) == address(0), "already set");
        dataProxy = IData(_dataProxy);
    }

    function getSigHash(address owner) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(owner));
    }

    function proxy(
        bytes32 ciphertextnonce,
        bytes memory data
    ) external payable {
        (address addr, bytes memory subcall_data) = abi.decode(
            Sapphire.decrypt(encryptionSecret, ciphertextnonce, data, ""),
            (address, bytes)
        );
        (bool success, bytes memory out_data) = addr.call{value: msg.value}(
            subcall_data
        );
        if (!success) {
            assembly {
                revert(add(out_data, 32), mload(out_data))
            }
        }
        kp.nonce += 1;
    }

    function makeDataTx(
        bytes memory signature,
        txRequest memory _txRequest
    )
        external
        view
        verifiedOnly(signature, _txRequest.owner)
        returns (bytes memory)
    {
        // hash request
        bytes32 requestHash = keccak256(
            abi.encodePacked(
                _txRequest.owner,
                _txRequest.name,
                _txRequest.age,
                _txRequest.bloodGroup,
                _txRequest._address,
                _txRequest.contact,
                _txRequest.email
            )
        );
        // encrypt request
        bytes32 ciphertextnonce = keccak256(
            abi.encodePacked(encryptionSecret, requestHash)
        );
        // inner call
        bytes memory innercall = abi.encodeWithSelector(
            dataProxy.proxy_addPatientData.selector,
            _txRequest.owner,
            _txRequest.name,
            _txRequest.age,
            _txRequest.bloodGroup,
            _txRequest._address,
            _txRequest.contact,
            _txRequest.email
        );
        // encrypt with sapphire
        bytes memory ciphertext = Sapphire.encrypt(
            encryptionSecret,
            ciphertextnonce,
            abi.encode(address(dataProxy), innercall),
            ""
        );
        // to invoke proxy
        bytes memory data = abi.encodeWithSelector(
            this.proxy.selector,
            ciphertextnonce,
            ciphertext
        );

        return
            EIP155Signer.sign(
                kp.addr,
                kp.secret,
                EIP155Signer.EthTx({
                    nonce: kp.nonce,
                    gasPrice: 100_000_000_000,
                    gasLimit: 1000000,
                    to: address(this),
                    value: 0,
                    data: data,
                    chainId: block.chainid
                })
            );
    }
}
