import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../patient';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ProgrammeExerciceComponent } from '../programme-exercice/programme-exercice.component';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  @Input() patient: Patient

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editProgram() {

    const dialogConfig = new MatDialogConfig();


    this.dialog.open(ProgrammeExerciceComponent, dialogConfig);

  }

}
