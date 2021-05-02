import {Component, Input} from '@angular/core';
import {Pipeline} from "../../models/pipeline";

@Component({
  selector: 'app-job-table',
  templateUrl: './pipeline-table.component.html',
  styleUrls: ['./pipeline-table.component.scss']
})
export class PipelineTableComponent {

  @Input()
  pipelines!: Pipeline[];
  severityMap = new Map<string,string>([
    ['success','success'],
    ['failed','danger'],
    ['canceled','warning'],
    ['skipped','info'],
  ]);

  constructor() { }

  public severity(status : string) : string {
    if(this.severityMap.has(status)){
      return this.severityMap.get(status) as string;
    }
    return 'info';
  }
}
