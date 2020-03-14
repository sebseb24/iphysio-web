import { Component, OnInit } from '@angular/core';

import { Patient } from '../patient';
import { PATIENTS } from '../mock-patient/mock-patient.component';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {


  patients = PATIENTS;

  constructor() { }

  ngOnInit(): void {
  }

  selectedPatient: Patient;

  onSelect(patient: Patient): void {
    this.selectedPatient = patient;
  }




}
