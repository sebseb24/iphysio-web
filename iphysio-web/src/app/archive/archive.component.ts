import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../NodeJS/services/patients/patient.service';
import { Patient } from '../../../NodeJS/models/patients';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  displayedColumns: string[] = ['name', 'isActive'];

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
