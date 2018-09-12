pragma solidity ^0.4.23;

contract Emblem {
    address public owner;
    uint public last_completed_migration;

    constructor() public {
        owner = msg.sender;
    }

    struct Transcript {
        uint createdAt; // "now"
        bytes32[3] signature;  // signature of the transcript hash
        string highSchool; // high school that the transcript came from
    }

    mapping (bytes32 => Transcript) public transcripts;

    function addTranscript(bytes32 transcriptHash, bytes32[3] signature, string highSchool) public {
        uint createdAt = block.timestamp;
        transcripts[transcriptHash] = Transcript(createdAt, signature, highSchool);
    }

    event OwnershipTransferred(address oldOwner, address newOwner);

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner);
        require(newOwner != address(0));
        owner = newOwner;
        emit OwnershipTransferred(msg.sender, newOwner);
    }
}
