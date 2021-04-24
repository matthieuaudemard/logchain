pragma solidity >=0.4.22 <0.9.0;

contract Logchain {
    uint public pipelineCount = 0;
    mapping(uint => Pipeline) public pipelines;

    struct Pipeline {
        uint blockId;
        uint id;
        string status;
        string startedAt;
        string finishedAt;
        string sha;
        string ref;
    }

    event PipelineCreated(
        uint blockId,
        uint id,
        string status,
        string startedAt,
        string finishedAt,
        string sha,
        string ref
    );

    constructor() public {
    }

    function createPipeline(
        uint _id,
        string memory _status,
        string memory _startedAt,
        string memory _finishedAt,
        string memory _sha,
        string memory _ref
    ) public {
        require(_id > 0);
        pipelineCount ++;
        pipelines[pipelineCount] = Pipeline(
            pipelineCount,
            _id,
            _status,
            _startedAt,
            _finishedAt,
            _sha,
            _ref);
        emit PipelineCreated(
            pipelineCount,
            _id,
            _status,
            _startedAt,
            _finishedAt,
            _sha,
            _ref);
    }
}
