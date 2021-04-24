import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Job} from '../models/job';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly API_URL = 'http://localhost:3333/api';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Renvoie tous les LogEntry enregistrés sur la blockchain
   */
  public getAll(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.API_URL + '/jobs');
  }
}
