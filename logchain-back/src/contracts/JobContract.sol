pragma solidity >=0.4.22 <0.9.0;

contract JobContract {
    uint public jobCount = 0;
    mapping(uint => Job) public jobs;

    struct Job {
        uint id;
        string status;
        string branch;
        string stage;
        string name;
        string commit;
        uint pipeline;
        string pipelineStatus;
    }

    event JobCreated(
        uint id,
        string status,
        string branch,
        string stage,
        string name,
        string commit,
        uint pipeline,
        string pipelineStatus
    );

    constructor() public {
    }

    function createJob(
        uint _id,
        string memory _status,
        string memory _branch,
        string memory _stage,
        string memory _name,
        string memory _commit,
        uint _pipeline,
        string memory _pipelineStatus
    ) public {
        require(_id > 0);
        jobCount ++;
        jobs[jobCount] = Job(
            _id,
            _status,
            _branch,
            _stage,
            _name,
            _commit,
            _pipeline,
            _pipelineStatus);
        emit JobCreated(
            _id,
            _status,
            _branch,
            _stage,
            _name,
            _commit,
            _pipeline,
            _pipelineStatus
        );
    }
}
