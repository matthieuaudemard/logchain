import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Job} from '../models/job';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private endPoint = 'http://localhost:1337';

  constructor(private httpClient: HttpClient) { }

  /**
   * Renvoie tous les LogEntry enregistrés sur la blockchain
   * TODO: interroger l'api pour récupérer les objets
   */
  public getAll(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.endPoint + '/api/jobs');
  }
}
