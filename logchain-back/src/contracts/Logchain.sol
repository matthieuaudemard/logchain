pragma solidity >=0.4.22 <0.9.0;

contract Logchain {
    string public commit;

    struct LogEntry {
        uint id;

        string commitSha;
        string commitTitle;
        string commitAuthor;
        string commitDiff;

        string jobId;
        string jobManual;
        string jobName;
        string jobStage;
        string jobStatus;
        string jobStartedAt;

        string pipelineId;
        string pipelineSource;
        string pipelineCreatedAT;

        string gitlabUserId;
        string gitlabUserLogin;
        string gitlabUserName;
        string gitlabUserMail;
    }

    constructor() public {
        commit = "9832ffac51bc13bc5710ed8d3ad3b779a17b6189";
    }
}