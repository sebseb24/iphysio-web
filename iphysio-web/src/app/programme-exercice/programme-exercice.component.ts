import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-programme-exercice',
  templateUrl: './programme-exercice.component.html',
  styleUrls: ['./programme-exercice.component.scss']
})
export class ProgrammeExerciceComponent implements OnInit {

  selected = 'option2';
  dateDebut = new FormControl((new Date()).toISOString());
  constructor(private dialogRef: MatDialogRef<ProgrammeExerciceComponent>) { }

  ngOnInit(): void {
  }

  sauvegarder() {
    this.dialogRef.close();
  }

  fermer() {
      this.dialogRef.close();
  }

}
