import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Historique } from '../models/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  readonly baseURL = 'http://localhost:3000/historique';
  historique: Historique[];

  constructor(private http: HttpClient) { }

  getHistoriqueList(patientId : string) {
    return this.http.get(this.baseURL +  `/${patientId}`);
  }
}
