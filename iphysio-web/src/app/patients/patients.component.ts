import { Component, OnInit } from '@angular/core';

import { Patient } from '../shared/patient.model';
import { PATIENTS } from '../mock-patient/mock-patient.component';
import { PatientService } from '../shared/patient.service'


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {


  //patients = PATIENTS;

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
