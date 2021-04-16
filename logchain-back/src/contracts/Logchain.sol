pragma solidity >=0.4.22 <0.9.0;

contract Logchain {
    uint public jobCount = 0;
    mapping(uint => Job) public jobs;

    struct Job {
        uint blockId;
        uint jobId;
        string jobName;
        string jobStage;
        string jobStatus;
        string jobStartedAt;
        string commitSha;
        string commitTitle;
    }

    event JobCreated(
        uint blockId,
        uint jobId,
        string jobName,
        string jobStage,
        string jobStatus,
        string jobStartedAt,
        string commitSha,
        string commitTitle
    );

    constructor() public {
    }

    function createJob(
        uint _jobId,
        string memory _jobName,
        string memory _jobStage,
        string memory _jobStatus,
        string memory _jobStartedAt,
        string memory _commitSha,
        string memory _commitTitle
    ) public {
        require(_jobId > 0);
        jobCount ++;
        jobs[jobCount] = Job(
            jobCount,
            _jobId,
            _jobName,
            _jobStage,
            _jobStatus,
            _jobStartedAt,
            _commitSha,
            _commitTitle);
        emit JobCreated(
            jobCount,
            _jobId,
            _jobName,
            _jobStage,
            _jobStatus,
            _jobStartedAt,
            _commitSha,
            _commitTitle);
    }
}
