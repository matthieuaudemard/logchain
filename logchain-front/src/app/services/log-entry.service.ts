import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {LogEntry} from '../models/log-entry';

@Injectable({
  providedIn: 'root'
})
export class LogEntryService {

  entries: LogEntry[] = [
    {id: 1, jobId: 146, jobName: 'truffle-test', jobStatus: 'success', branchName: 'develop', commitSha: 'd22c5257d7ab1ca67a2d31013557bc20e528a561', jobStartedAt: '2021-04-11T05:36:18.103Z'},
    {id: 2, jobId: 100, jobName: 'docker-build', jobStatus: 'canceled', branchName: 'ci-angular-testing', commitSha: '4d96dfe6dd13401e3a363ad4932c2f7e882c6c11', jobStartedAt: '2021-04-12T16:52:37.352Z'},
    {id: 3, jobId: 114, jobName: 'ng-build', jobStatus: 'failed', branchName: 'master', commitSha: '6de76e9d9573c15a2085379cca5d838df1f61994', jobStartedAt: '2021-04-11T12:38:55.224Z'},
  ]

  constructor() { }

  /**
   * Renvoie tous les LogEntry enregistrés sur la blockchain
   * TODO: interroger l'api pour récupérer les objets
   */
  public getAll(): Observable<LogEntry[]> {
    return  of<LogEntry[]>(this.entries);
  }
}
