import {Component, OnInit} from '@angular/core';
import {JobService} from '../../services/job.service';
import {Job} from '../../models/job';

@Component({
  selector: 'app-event-order-list',
  templateUrl: './job-order-list.component.html',
  styleUrls: ['./job-order-list.component.scss']
})
export class JobOrderListComponent implements OnInit {

  jobs!: Job[];

  constructor(private JobService: JobService) {
  }

  ngOnInit(): void {
    this.JobService.getAll().subscribe(jobs => this.jobs = jobs);
  }

}
