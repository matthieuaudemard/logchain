import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Job} from '../models/job';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private API_URL = 'http://server:3333';

  constructor(private httpClient: HttpClient) { }

  /**
   * Renvoie tous les LogEntry enregistrés sur la blockchain
   */
  public getAll(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.API_URL + '/api/jobs');
  }
}
