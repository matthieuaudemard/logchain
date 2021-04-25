import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pipeline} from '../models/pipeline';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PipelineService {

  private readonly apiUrl = 'http://' + location.hostname + ':3333/api';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Renvoie tous les LogEntry enregistrés sur la blockchain
   */
  public getAll(): Observable<Pipeline[]> {
    console.log(this.apiUrl);
    return this.httpClient.get<Pipeline[]>(this.apiUrl + '/pipelines');
  }
}
