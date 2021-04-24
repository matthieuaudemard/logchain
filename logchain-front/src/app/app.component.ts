import {Component, OnInit} from '@angular/core';
import {PipelineService} from "./services/pipeline.service";
import {Pipeline} from "./models/pipeline";
import {EnumDisplay} from "./models/enum-display";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'logchain-front';
  pipelines!: Pipeline[];
  displays: EnumDisplay[] = [
    {code: 'TIMELINE', label: 'TIMELINE'},
    {code: 'TABLE', label: 'TABLEAU'},
  ];
  displayMode: EnumDisplay = this.displays[0];

  constructor(private pipelineService: PipelineService) {}

  ngOnInit(): void {
    this.pipelineService.getAll().subscribe(pipelines => this.pipelines = pipelines);
  }

}
