// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Vault {
    mapping(address => uint256) isExist;
    mapping(address => uint256) balances;
    mapping(address => bytes32) password;

    event Register(address from, string password, uint256 status);
    event Transfer(address from, address to, uint256 amount);

    constructor() {}

    function register(string memory pwd) public returns (uint256) {
        bytes32 p = keccak256(abi.encodePacked(pwd));

        if (isExist[msg.sender] == 1) {
            emit Register(msg.sender, pwd, 0);
            return 0;
        }
        isExist[msg.sender] = 1;
        password[msg.sender] = p;
        emit Register(msg.sender, pwd, 1);

        return 1;
    }

    function login(string memory pwd) public view returns (uint256) {
        bytes32 p = keccak256(abi.encodePacked(pwd));

        if (isExist[msg.sender] == 0) return 0;

        if (p != password[msg.sender]) return 1;

        return 2;
    }

    function deposit() public payable {
        require(msg.sender != address(0));
        require(msg.value != 0);

        balances[msg.sender] += msg.value;
    }

    function transfer(address to, uint256 amount) public {
        require(to != address(0));
        require(amount != 0);
        require(balances[msg.sender] >= amount);
        require(isExist[to] == 1);


        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    function balanceOfMe() public view returns (uint256) {
        return balances[msg.sender];
    }
}
