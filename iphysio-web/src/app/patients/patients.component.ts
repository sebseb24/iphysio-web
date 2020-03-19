import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

import { Patient } from '../../../NodeJS/models/patients';
import { PatientService } from './patient.service'

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor(public patientService: PatientService, private _router: Router) { }

  ngOnInit(): void {
    this.refreshPatientList();
  }

  selectedPatient: Patient;

  onSelect(patient: Patient): void {
    this.selectedPatient = patient;
  }

  refreshPatientList() {
    this.patientService.getPatientList().subscribe(
      (res) => {
        this.patientService.patients = res as Patient[];
      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
            localStorage.removeItem('token');
            this._router.navigate(['/login']);
          }
        }
      });
  }
}
