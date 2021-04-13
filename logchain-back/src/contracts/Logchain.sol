pragma solidity >=0.4.22 <0.9.0;

contract Job {
    string public commit;

    struct Job {
        uint blockId;

        string commitSha;
        string commitTitle;
        string commitAuthor;
        string commitDiff;
        string branchName;

        uint jobId;
        bool jobManual;
        string jobName;
        string jobStage;
        string jobStatus;
        string jobStartedAt;

        uint pipelineId;
        string pipelineCreatedAT;

        uint gitlabUserId;
        string gitlabUserLogin;
        string gitlabUserName;
        string gitlabUserMail;
    }

    constructor() public {
        commit = "9832ffac51bc13bc5710ed8d3ad3b779a17b6189";
    }
}
