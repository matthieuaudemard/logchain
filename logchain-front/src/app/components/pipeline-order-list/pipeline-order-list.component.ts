import {Component, Input} from '@angular/core';
import {Pipeline} from '../../models/pipeline';

@Component({
  selector: 'app-event-order-list',
  templateUrl: './pipeline-order-list.component.html',
  styleUrls: ['./pipeline-order-list.component.scss']
})
export class PipelineOrderListComponent {

  @Input()
  pipelines!: Pipeline[];

  constructor() {}

}
