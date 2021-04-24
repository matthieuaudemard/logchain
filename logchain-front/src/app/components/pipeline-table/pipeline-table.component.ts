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
    ['cancel','warning'],
  ]);

  constructor() { }

  public severity(status : string) : string {
    if(status === 'success'){
      return 'success';
    } else if (status === 'failed'){
      return 'danger';
    } else if (status === 'cancel'){
      return 'warning';
    }
    return 'info';
  }
}
