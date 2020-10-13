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

  constructor(
    private dialogRef: MatDialogRef<NewExerciceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService : PatientService
    ) { }

  ngOnInit(): void {
  }

  ajoutElement() {

    // if(this.data.exercices == null) {
    //   this.data.exercices = [];
    // }

    // this.data.exercices.push(this.selectedExercice);
    // console.log(this.data.exercices);
  }

  sauvegarder() {

    if(this.data._id == null) {
      // on veut post un nouveau programme d'exercice
      console.log("Ajout d'un programme pour le patient " + this.patientService.selectedPatient._id);
      this.patientService.postProgramExercice(this.patientService.selectedPatient._id, {
        nom : this.data.nom,
        exercices : this.data.exercices
      }).subscribe(
        (res) => {
          console.log("fini");
          this.dialogRef.close();

        }, (err) => {
          console.log(err);
          this.dialogRef.close();
        }
      )
    } else {

      console.log(this.data);
      this.patientService.putProgramExercice(this.data).subscribe((res) => {
        console.log(res);
        this.dialogRef.close();
      }, (err) => {
        console.log(err);
        this.dialogRef.close();
      })
    }    
  }

}
