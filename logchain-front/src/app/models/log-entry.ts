export interface LogEntry {
  id: number,
  commitSha?: string,
  commitTitle?: string,
  commitAuthor?: string,
  commitDiff?: string,
  branchName?: string

  jobId?: number,
  jobManual?: boolean,
  jobName?: string,
  jobStage?: string,
  jobStatus?: string,
  jobStartedAt?: string,

  pipelineId?: number,
  pipelineSource?: string,
  pipelineCreatedAt?: string,

  gitlabUserId?: number,
  gitlabUserLogin?: string,
  gitlabUserName?: string,
  gitlabUserMail?: string
}
