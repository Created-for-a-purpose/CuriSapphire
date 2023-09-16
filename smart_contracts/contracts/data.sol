// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Data {

    address immutable public relayerAddress;

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

    struct healthcareProviderData {
        address owner;
        string name;
        string license;
        string _address;
        string contact;
        string email;
    }

    mapping (address => patientData) private patients;
    mapping (address => healthcareProviderData) private pharmacies;
    mapping (address => healthcareProviderData) private hospitals;

    constructor(address _relayerAddress) {
        relayerAddress = _relayerAddress;
    }

    function addPatientData(address owner, string memory _name, uint256 _age, string memory _bloodGroup, string memory _address, string memory _contact, string memory _email) internal {
       address[] memory _access;
       patientData memory _patientData = patientData(owner, _access, _name, _age, _bloodGroup, _address, _contact, _email);
       patients[owner] = _patientData;
    }

    function addPharmacyData(address owner, string memory _name, string memory _license, string memory _address, string memory _contact, string memory _email) internal {
       healthcareProviderData memory _pharmacyData = healthcareProviderData(owner, _name, _license, _address, _contact, _email);
       pharmacies[owner] = _pharmacyData;
    }

    function addHospitalData(address owner, string memory _name, string memory _license, string memory _address, string memory _contact, string memory _email) internal {
       healthcareProviderData memory _hospitalData = healthcareProviderData(owner, _name, _license, _address, _contact, _email);
       hospitals[owner] = _hospitalData;
    }

    function giveAccess(address from, address to) internal {
        patients[from].access.push(to);
    }

    function getHash(address patient) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(patient));
    }

    function getPatientData(address patient, bytes memory signature) external view
    returns (patientData memory)
    {
        bytes32 message = getHash(patient);
        bytes32 messageHash = ECDSA.toEthSignedMessageHash(message);
        address signer = ECDSA.recover(messageHash, signature);

       if(signer==patient) return patients[patient];
       address[] memory access = patients[patient].access;

       patientData memory _patientData;
       for(uint i = 0; i < access.length; i++) {
           if(access[i] == signer) {
               _patientData = patients[patient];
               break;
           }
       }
       return _patientData;
    }

    modifier signedOnly {
        require(msg.sender == relayerAddress, "Unauthorized");
        _;
    }

    function proxy_addPatientData(address owner, string memory _name, uint256 _age, string memory _bloodGroup, string memory _address, string memory _contact, string memory _email) external 
    signedOnly 
    {
        addPatientData(owner, _name, _age, _bloodGroup, _address, _contact, _email);
    }

    function proxy_addPharmacyData(address owner, string memory _name, string memory _license, string memory _address, string memory _contact, string memory _email) external 
    signedOnly
    {
        addPharmacyData(owner, _name, _license, _address, _contact, _email);
    }

    function proxy_addHospitalData(address owner, string memory _name, string memory _license, string memory _address, string memory _contact, string memory _email) external 
    signedOnly
    {
        addHospitalData(owner, _name, _license, _address, _contact, _email);
    }

    function proxy_giveAccess(address owner, address to) external 
    signedOnly
    {
        giveAccess(owner, to);
    }

}
