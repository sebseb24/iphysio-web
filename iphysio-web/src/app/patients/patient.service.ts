import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Patient } from '../../../NodeJS/models/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  selectedPatient: Patient;
  patients: Patient[];
  readonly baseURL = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) { }

  postPatient(pat : Patient) {
    return this.http.post(this.baseURL, pat);
  }

  getPatientList(_id: String) {
    return this.http.get(this.baseURL +  `/${_id}`);
  }

  putPatient(pat : Patient) {
    return this.http.put(this.baseURL + `/${pat._id}`, pat);
  }

  deletePatient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
