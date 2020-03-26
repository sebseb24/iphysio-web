import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

import { Patient } from '../../../NodeJS/models/patients';
import { PatientService } from './patient.service';

import { Historique } from '../../../NodeJS/models/historique';
import { HistoriqueService } from '../../../NodeJS/services/historique.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor(public patientService: PatientService, private _router: Router, private historiqueService: HistoriqueService) { }

  ngOnInit(): void {
    this.refreshPatientList();
  }

  selectedPatient: Patient;

  onSelect(patient: Patient): void {
    this.selectedPatient = patient;
    this.patientService.selectedPatient = patient;

    this.patientService.getProgrammeList(patient._id).subscribe(
      (res) => {
        this.patientService.programmeList= res as any[];
        console.log(this.patientService.programmeList);
      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
          }
        }
      });

      this.historiqueService.getHistoriqueList(this.patientService.selectedPatient._id).subscribe(
        (res) => {
          this.historiqueService.historique = res as Historique[];
        },
        (err) => {
        });
  }

  refreshPatientList() {
    this.patientService.getPatientList(localStorage.getItem('_id')).subscribe(
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
