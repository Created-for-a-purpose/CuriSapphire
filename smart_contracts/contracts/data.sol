// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Data {

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

    mapping (address => patientData) public patients;
    mapping (address => healthcareProviderData) public pharmacies;
    mapping (address => healthcareProviderData) public hospitals;

    function addPatientData(string memory _name, uint256 _age, string memory _bloodGroup, string memory _address, string memory _contact, string memory _email) public {
       address[]  memory _access;
       patientData memory _patientData = patientData(msg.sender, _access, _name, _age, _bloodGroup, _address, _contact, _email);
       patients[msg.sender] = _patientData;
    }

    function addPharmacyData(string memory _name, string memory _license, string memory _address, string memory _contact, string memory _email) public {
       healthcareProviderData memory _pharmacyData = healthcareProviderData(msg.sender, _name, _license, _address, _contact, _email);
       pharmacies[msg.sender] = _pharmacyData;
    }

    function addHospitalData(string memory _name, string memory _license, string memory _address, string memory _contact, string memory _email) public {
       healthcareProviderData memory _hospitalData = healthcareProviderData(msg.sender, _name, _license, _address, _contact, _email);
       hospitals[msg.sender] = _hospitalData;
    }

    function giveAccess(address to) public {
        patients[msg.sender].access.push(to);
    }

    function getPatientData(address patient) public view returns (patientData memory){
       address owner = patients[patient].owner;
       address[] memory access = patients[patient].access;
       for(uint i = 0; i < access.length; i++) {
           if(access[i] == msg.sender) {
               return patients[patient];
           }
       }
       require(owner == msg.sender, "You are not authorized to access this data");
       return patients[patient];
    }


}
