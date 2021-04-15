pragma solidity >=0.4.22 <0.9.0;

contract Logchain {
    uint public jobCount = 0;
    mapping(uint => Job) public jobs;

    struct Job {
        uint blockId;
        uint jobId;
        string jobStatus;
        string jobStartedAt;
    }

    event JobCreated(
        uint blockId,
        uint jobId,
        string jobStatus,
        string jobStartedAt
    );

    constructor() public {
    }

    function createJob(
        uint _jobId,
        string memory _jobStatus,
        string memory _jobStartedAt
    ) public {
        require(_jobId > 0);
        jobCount ++;
        jobs[jobCount] = Job(
            jobCount,
            _jobId,
            _jobStatus,
            _jobStartedAt);
        emit JobCreated(
            jobCount,
            _jobId,
            _jobStatus,
            _jobStartedAt);
    }
}
