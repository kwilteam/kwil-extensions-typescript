const registryAbi: Array<string> =
[
    'function delete_grant(address _grantee, string _dataId)',
    'function insert_grant(address _grantee, string _dataId)',
    'constructor()',
    'function grants(address, string, uint256) view returns (address owner, address grantee, string dataId)',
    'function grants_for(address _grantee, string _dataId) view returns (tuple(address owner, address grantee, string dataId)[])'
]
export default registryAbi;