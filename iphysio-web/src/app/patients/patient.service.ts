import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Patient } from '../../../NodeJS/models/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  selectedPatient: Patient;
  programmeList : any[];
  patients: Patient[];


  readonly baseURL = 'http://localhost:3000/patients';
  readonly progURL = 'http://localhost:3000/programmes';
  readonly exerURL = 'http://localhost:3000/exercices';

  constructor(private http: HttpClient) { }

  postPatient(pat : Patient) {
    return this.http.post(this.baseURL, pat);
  }

  getPatientList() {
    return this.http.get(this.baseURL);
  }

  putPatient(pat : Patient) {
    return this.http.put(this.baseURL + `/${pat._id}`, pat);
  }

  deletePatient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  getSelectedPatient() {
    return this.selectedPatient;
  }

  getProgrammeList(patientId : string) {
    return this.http.get(this.progURL + `/${patientId}`);

  }

  getExerciceList() {
    return this.http.get(this.exerURL);
  }

  postProgramExercice(patientId : string, programme : any) {
    programme.patientId = patientId;
    return this.http.post(this.progURL, programme);
  }

  deleteProgrammeExercice(id : string) {
    return this.http.delete(this.progURL + `/${id}`);
  }



}
