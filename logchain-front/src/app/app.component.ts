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
  pipelinesTable!: Pipeline[];
  displays: EnumDisplay[] = [EnumDisplay.TIMELINE, EnumDisplay.TABLE];
  displayMode: EnumDisplay = EnumDisplay.TIMELINE;
  enumDisplay = EnumDisplay;

  constructor(private pipelineService: PipelineService) {
  }

  ngOnInit(): void {
    this.pipelineService.getAll().subscribe(pipelines => {
      this.pipelines = pipelines.sort((a, b) => (b.id || 0) - (a.id || 0));
      this.pipelinesTable = [...this.pipelines];
    });
  }

}
