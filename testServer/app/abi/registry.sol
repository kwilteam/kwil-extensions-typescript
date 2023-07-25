// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
/// @title Test Address registry v0
/// @author Antoni Dikov and Shelby Doolittle
contract TestRegistry {
    constructor() {}

    struct Grant {
        address owner;
        address grantee;
        string dataId;
    }

    // Mapping of grantee and dataId to an array of grants.
    mapping(address => mapping(string => Grant[])) public grants;

    function insert_grant(address _grantee, string memory _dataId) public {
        Grant memory newGrant = Grant({
            owner: msg.sender,
            grantee: _grantee,
            dataId: _dataId
        });
        
        grants[_grantee][_dataId].push(newGrant);
    }

    function delete_grant(address _grantee, string memory _dataId) public {
        require(grants[_grantee][_dataId].length > 0, "No grants found for this grantee and dataId");
        for (uint i = 0; i < grants[_grantee][_dataId].length; i++) {
            if (grants[_grantee][_dataId][i].owner == msg.sender) {
                // Move the last grant into the place of the one to delete
                grants[_grantee][_dataId][i] = grants[_grantee][_dataId][grants[_grantee][_dataId].length - 1];
                // Remove the last one
                grants[_grantee][_dataId].pop();
                return;
            }
        }
        revert("Grant not found");
    }


    function grants_for(address _grantee, string memory _dataId) public view returns (Grant[] memory) {
        return grants[_grantee][_dataId];
    }
}