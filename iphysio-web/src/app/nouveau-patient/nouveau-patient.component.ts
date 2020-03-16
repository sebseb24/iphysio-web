import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup, NgForm, NgModel} from "@angular/forms";
import { PatientService } from '../shared/patient.service';
import { Patient } from '../shared/patient.model';

declare var M: any;


@Component({
  selector: 'app-nouveau-patient',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.scss']
})
export class NouveauPatientComponent implements OnInit {

  form: FormGroup;

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
    this.patientService.getPatientList().subscribe((res) => {
      this.patientService.patients = res as Patient[];
    });
  }
}
