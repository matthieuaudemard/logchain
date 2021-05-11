import {Component, OnInit} from '@angular/core';
import {PipelineService} from "./services/pipeline.service";
import {Pipeline} from "./models/pipeline";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pipelines!: Pipeline[];

  constructor(private pipelineService: PipelineService) {
  }

  ngOnInit(): void {
    this.pipelineService.getAll().subscribe(pipelines => {
      this.pipelines = pipelines.sort((a, b) => (b.id || 0) - (a.id || 0));
    });
  }

}
