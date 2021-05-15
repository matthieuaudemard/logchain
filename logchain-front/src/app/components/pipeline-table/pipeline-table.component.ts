import {Component, Input} from '@angular/core';
import {Pipeline} from "../../models/pipeline";
import {Job} from "../../models/job";

@Component({
  selector: 'app-job-table',
  templateUrl: './pipeline-table.component.html',
  styleUrls: ['./pipeline-table.component.scss']
})
export class PipelineTableComponent {

  @Input()
  pipelines!: Pipeline[];
  currentJob!: Job;
  display: boolean = false;
  severityMap = new Map<string, string>([
    ['success', 'success'],
    ['failed', 'danger'],
    ['canceled', 'warning'],
    ['skipped', 'info'],
  ]);

  constructor() {
  }

  public severity(status: string): string {
    if (this.severityMap.has(status)) {
      return this.severityMap.get(status) as string;
    }
    return 'info';
  }

  displayJob(job: Job) {
    this.currentJob = job;
    this.display = true;
  }

  hideJob() {
    this.display = false;
  }
}
