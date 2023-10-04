// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

struct reportData {
    address patient;
    string reportIssuers;
    string testName;
    string testDetails;
    string diagnosis;
    uint256 timestamp;
}

struct pxData {
    address patient;
    string issuerDetails;
    string medicineDetails;
    uint256 timestamp;
}

struct researchData {
    address dataProvider;
    string requiredData;
    uint256 issueTimestamp;
    uint256 stakeDurationInDays;
    uint256 stakeAmount;
    bool stakeExpired;
}

contract Tokenization {
    string public name;
    string public symbol;
    uint256 public totalSupply;

    mapping(uint256 => reportData) private report;
    mapping(uint256 => pxData) private px;
    mapping(uint256 => researchData) private stakedData;

    mapping(uint256 => address) private reportOwner;
    mapping(uint256 => address) private pxOwner;
    mapping(uint256 => address) private stakedDataHolder;

    mapping(address => uint256[]) private tokensOwned;
    mapping(address => uint256[]) private stakedDataHolded;

    constructor() payable {
        name = "Healthcare token";
        symbol = "HT";
    }

    modifier authorizedOnly(address owner, bytes memory signature) {
        require(checkSig(owner, signature), "Invalid signature");
        _;
    }

    function checkSig(
        address owner,
        bytes memory signature
    ) internal pure returns (bool) {
        bytes32 sigHash = getSigHash(owner);
        bytes32 ethSignedHash = ECDSA.toEthSignedMessageHash(sigHash);
        address signer = ECDSA.recover(ethSignedHash, signature);
        return signer == owner;
    }

    function getSigHash(address owner) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(owner));
    }

    function createReportToken(
        address receiver,
        reportData memory _reportData,
        bytes memory signature
    ) external payable authorizedOnly(_reportData.patient, signature) {
        require(msg.value == 1 ether, "Insufficient funds");
        uint256 id = totalSupply;
        address patient = _reportData.patient;
        report[id] = _reportData;
        reportOwner[id] = patient;
        tokensOwned[patient].push(id);
        totalSupply++;
        transferReportToken(id, receiver);
    }

    function transferReportToken(uint256 id, address to) internal {
        reportOwner[id] = to;
        tokensOwned[to].push(id);
    }

    function readReportToken(
        address patient,
        address reader,
        bytes memory signature
    )
        external
        view
        authorizedOnly(reader, signature)
        returns (reportData memory)
    {
        uint256[] memory tokens = tokensOwned[reader];
        for (uint i = 0; i < tokens.length; i++) {
            if (
                reportOwner[tokens[i]] == reader &&
                report[tokens[i]].patient == patient &&
                report[tokens[i]].timestamp + 3600 < block.timestamp
            ) {
                return report[tokens[i]];
            }
        }

        return reportData(patient, "", "", "", "", 0);
    }

    function createPxToken(
        address receiver,
        pxData memory _pxData,
        bytes memory signature
    ) external payable authorizedOnly(_pxData.patient, signature) {
        require(msg.value == 1 ether, "Insufficient funds");
        uint256 id = totalSupply;
        address patient = _pxData.patient;
        px[id] = _pxData;
        pxOwner[id] = patient;
        tokensOwned[patient].push(id);
        totalSupply++;
        transferPxToken(id, receiver);
    }

    function transferPxToken(uint256 id, address to) internal {
        pxOwner[id] = to;
        tokensOwned[to].push(id);
    }

    function readPxToken(
        address patient,
        address reader,
        bytes memory signature
    ) external view authorizedOnly(reader, signature) returns (pxData memory) {
        uint256[] memory tokens = tokensOwned[reader];
        for (uint i = 0; i < tokens.length; i++) {
            if (
                pxOwner[tokens[i]] == reader &&
                px[tokens[i]].patient == patient &&
                px[tokens[i]].timestamp + 3600 < block.timestamp
            ) {
                return px[tokens[i]];
            }
        }

        return pxData(patient, "", "", 0);
    }

    function createResearchDataToken(
        address researcher,
        researchData memory _researchData,
        bytes memory signature
    ) external authorizedOnly(_researchData.dataProvider, signature) {
        require(
            _researchData.stakeDurationInDays > 0,
            "Invalid stake duration"
        );
        _researchData.issueTimestamp = block.timestamp;
        _researchData.stakeExpired = false;
        researchData memory data = _researchData;
        uint256 id = totalSupply;
        stakedData[id] = data;
        stakedDataHolder[id] = researcher;
        totalSupply++;
        stakeResearchDataToken(payable(data.dataProvider), data.stakeAmount);
        stakedDataHolded[researcher].push(id);
    }

    function stakeResearchDataToken(
        address payable dataProvider,
        uint256 value
    ) internal {
        require(address(this).balance >= value, "Insufficient funds");
        dataProvider.transfer(value);
    }

    function accessResearchData(
        address dataProvider,
        address accessor,
        bytes memory signature
    )
        external
        view
        authorizedOnly(accessor, signature)
        returns (researchData memory)
    {
        uint256[] memory tokens = stakedDataHolded[accessor];
        for (uint i = 0; i < tokens.length; i++) {
            if (
                stakedDataHolder[tokens[i]] == accessor &&
                stakedData[tokens[i]].dataProvider == dataProvider &&
                stakedData[tokens[i]].issueTimestamp +
                    stakedData[tokens[i]].stakeDurationInDays *
                    24 hours *
                    3600 seconds >
                block.timestamp &&
                stakedData[tokens[i]].stakeExpired == false
            ) {
                return stakedData[tokens[i]];
            }
        }
        revert("Data expired or no data found");
    }
}
