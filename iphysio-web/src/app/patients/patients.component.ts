import { Component, OnInit } from '@angular/core';

import { Patient } from '../../../NodeJS/models/patients';
//import { PATIENTS } from '../mock-patient/mock-patient.component';
import { PatientService } from './patient.service'


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  ngOnInit(): void {
    this.refreshPatientList();
  }

  selectedPatient: Patient;

  onSelect(patient: Patient): void {
    this.selectedPatient = patient;
  }

  refreshPatientList() {
    this.patientService.getPatientList().subscribe((res) => {
      this.patientService.patients = res as Patient[];
    });
  }
}
