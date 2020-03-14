import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Patient } from '../patient';


@Component({
  selector: 'app-nouveau-patient',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.scss']
})
export class NouveauPatientComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<NouveauPatientComponent>) {}

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }

}
