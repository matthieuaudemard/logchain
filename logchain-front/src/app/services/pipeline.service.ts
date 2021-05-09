import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pipeline} from '../models/pipeline';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  private readonly API_URL = 'http://' + location.hostname + ':3333/api';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Renvoie toutes les pipelines enregistrés sur la blockchain
   */
  public getAll(): Observable<Pipeline[]> {
    return this.httpClient.get<Pipeline[]>(this.API_URL + '/pipelines');
  }
}
