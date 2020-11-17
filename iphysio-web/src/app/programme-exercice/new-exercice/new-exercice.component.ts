import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { PatientService } from '../../patients/patient.service';

@Component({
  selector: 'app-new-exercice',
  templateUrl: './new-exercice.component.html',
  styleUrls: ['./new-exercice.component.scss']
})
export class NewExerciceComponent implements OnInit {

  selectedExercice : any;
  public btnSauvegardeMsg : String

  constructor(
    private dialogRef: MatDialogRef<NewExerciceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService : PatientService
    ) { 
      this.selectedExercice = data.exercice;

      if(data.option.isNewExercice == true){
        this.btnSauvegardeMsg = "Ajouter";
      }
      else {
        this.btnSauvegardeMsg = "Modifier"
      }
    }

  ngOnInit(): void {
  }

  ajoutElement() {

    this.data.exercice = this.selectedExercice;
    this.dialogRef.close("OK");
  }



}
