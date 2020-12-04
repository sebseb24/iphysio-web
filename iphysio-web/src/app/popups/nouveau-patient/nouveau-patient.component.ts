import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup, NgForm, NgModel} from "@angular/forms";
import { PatientService } from '../../../../NodeJS/services/patients/patient.service';
import { Patient } from '../../../../NodeJS/models/patients';
import { Physio } from '../../../../NodeJS/models/physios';


declare var M: any;


@Component({
  selector: 'app-nouveau-patient',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.scss']
})
export class NouveauPatientComponent implements OnInit {


  physios : Physio[];
  selectedPhysio : String;



  constructor(private dialogRef: MatDialogRef<NouveauPatientComponent>, private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPhysios().subscribe((res) => {
      this.physios = res as Physio[];

      this.selectedPhysio = localStorage.getItem('_id');



    }, (err) => {
      console.log(err)});
  }

  onSubmit(form: NgForm) {
    console.log(this.selectedPhysio);
    form.value.physio_associe = [this.selectedPhysio];
    //console.log(form);
    this.patientService.postPatient(form.value).subscribe((res) => {
      //M.toast({ html: 'Patient créé avec succès ! why ?? ', classes: 'rounded' });
      this.refreshPatientList();
      this.close();
    });
  }

  close() {
      this.dialogRef.close();
  }

  refreshPatientList() {
    this.patientService.getPatientList("5e73a4490ff6c3ac5cbd9147").subscribe((res) => {
      this.patientService.patients = res as Patient[];
    });
  }

  annuler() {
    console.log("jannule");
    this.dialogRef.close();
  } 
}
