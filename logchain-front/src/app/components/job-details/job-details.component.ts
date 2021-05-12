import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../../models/job";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  @Input()
  job!: Job;

  constructor() { }

  ngOnInit(): void {
  }


}
