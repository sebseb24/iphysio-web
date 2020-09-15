import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patients/patient.service';
import { Patient } from '../../../NodeJS/models/patients';
@Component({
  selector: 'app-patient-archive',
  templateUrl: './patient-archive.component.html',
  styleUrls: ['./patient-archive.component.scss']
})
export class PatientArchiveComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  lstPatient : Patient[];
  ngOnInit(): void {
    this.refreshPatientList();
  }

  refreshPatientList() {
    this.patientService.getAllPatientList(localStorage.getItem('_id')).subscribe(
      (res) => {
        this.patientService.patients = res as Patient[];
        this.lstPatient = this.patientService.patients;
      },
      (err) => {
        
      });
  }

  saveAll() {
    

   this.lstPatient.forEach(pat => {
      
    this.patientService.putPatient(pat).subscribe(
      (res) => {
        console.log("done one");
      },
      (err) => {
        
      });
    });
  }

}
