import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Patient } from '../../../NodeJS/models/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  selectedPatient: Patient;
  programmeList : any[];
  patients: Patient[];
  statsList : any[];

  readonly baseURL = 'http://localhost:3000/patients';
  readonly progURL = 'http://localhost:3000/programmes';
  readonly exerURL = 'http://localhost:3000/exercices';
  readonly physioURL = 'http://localhost:3000/physios';
  readonly statURL = 'http://localhost:3000/statistics';

  constructor(private http: HttpClient) { }

  postPatient(pat : Patient) {
    return this.http.post(this.baseURL, pat);
  }

  getPatientList(_id: String) {
    return this.http.get(this.baseURL +  `/${_id}`);
  }

  getPatientById(_id : String) {
    return this.http.get(this.baseURL +  `/patient/${_id}`);
  }

  getAllPatientList(_id: String) {
    return this.http.get(this.baseURL +  `/all/${_id}`);
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

  putProgramExercice(programme : any) {
    return this.http.put(this.progURL, programme);
  }

  getPhysios() {
    return this.http.get(this.physioURL + `/`);
  }

  getStatistics(patientId : string) {
    return this.http.get(this.statURL + `/${patientId}`);
  }



}
