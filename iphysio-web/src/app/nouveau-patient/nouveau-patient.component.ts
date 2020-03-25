import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup, NgForm, NgModel} from "@angular/forms";
import { PatientService } from '../patients/patient.service';
import { Patient } from '../../../NodeJS/models/patients';

declare var M: any;


@Component({
  selector: 'app-nouveau-patient',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.scss']
})
export class NouveauPatientComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NouveauPatientComponent>, private patientService: PatientService) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.patientService.postPatient(form.value).subscribe((res) => {
      M.toast({ html: 'Patient créé avec succès !', classes: 'rounded' });
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
}
