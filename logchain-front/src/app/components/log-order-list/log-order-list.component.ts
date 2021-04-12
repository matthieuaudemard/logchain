import {Component, OnInit} from '@angular/core';
import {LogEntryService} from "../../services/log-entry.service";
import {LogEntry} from "../../models/log-entry";

@Component({
  selector: 'app-event-order-list',
  templateUrl: './log-order-list.component.html',
  styleUrls: ['./log-order-list.component.scss']
})
export class LogOrderListComponent implements OnInit {

  events!: LogEntry[];

  constructor(private logEntryService: LogEntryService) {
  }

  ngOnInit(): void {
    this.logEntryService.getAll().subscribe(events => this.events = events);
  }

}
