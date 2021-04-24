import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pipeline} from '../models/pipeline';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  private readonly API_URL = 'http://localhost:3333/api';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Renvoie tous les LogEntry enregistrés sur la blockchain
   */
  public getAll(): Observable<Pipeline[]> {
    return this.httpClient.get<Pipeline[]>(this.API_URL + '/pipelines');
  }
}
