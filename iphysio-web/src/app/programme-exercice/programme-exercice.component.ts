import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PatientService } from '../../../NodeJS/services/patients/patient.service';
import { HttpErrorResponse } from '@angular/common/http';

import { NewExerciceComponent } from './new-exercice/new-exercice.component';


@Component({
  selector: 'app-programme-exercice',
  templateUrl: './programme-exercice.component.html',
  styleUrls: ['./programme-exercice.component.scss']
})
export class ProgrammeExerciceComponent implements OnInit {

 
  exercices : any[];  
  selectedExercice : any;

  constructor(private dialogRef: MatDialogRef<ProgrammeExerciceComponent>, 
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService : PatientService) {
      
     }

  ngOnInit(): void {
    this.refreshExerciceList();
  }

  sauvegarder() {

    if(this.data._id == null) {
 
      this.patientService.postProgramExercice(this.patientService.selectedPatient._id, {
        nom : this.data.nom,
        exercices : this.data.exercices
      }).subscribe(
        () => {
          this.dialogRef.close();

        }, (err) => {
          console.log(err);
          this.dialogRef.close();
        }
      )
    } else {

      this.patientService.putProgramExercice(this.data).subscribe((res) => {
        this.dialogRef.close();
      }, (err) => {
        console.log(err);
        this.dialogRef.close();
      })


    }    
  }

  fermer() {
      this.dialogRef.close();
  }

  refreshExerciceList() {
    this.patientService.getExerciceList().subscribe(
      (res) => {
        this.exercices = res as any[];

      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {

            console.log(err);
          }
        }
      });
  }

  showExerciceParam(exer) {
    const dialogConfig = new MatDialogConfig();

    this.selectedExercice = exer;   

    dialogConfig.data = {};
    dialogConfig.data.exercice = this.selectedExercice;
    
    dialogConfig.data.option = {};
    dialogConfig.data.option.isNewExercice = false;

    dialogConfig.width = "900px";
    dialogConfig.height = "inherit";

    let dialogRef = this.dialog.open(NewExerciceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  newExercice(exercice : any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = "900px";
    dialogConfig.height = "inherit";

     this.selectedExercice = {};
     this.selectedExercice.parametres = {
          exerciceId : exercice._id,
          nom : exercice.name,
          description : exercice.description
      };

      this.selectedExercice.refExercice = {};
      this.selectedExercice.refExercice = exercice;

                             
    dialogConfig.data = {};
    dialogConfig.data.option = {};
    dialogConfig.data.option.isNewExercice = true;

    dialogConfig.data.exercice = this.selectedExercice;

    let dialogRef = this.dialog.open(NewExerciceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
          if(result == "OK") {
            if(this.data.exercices == null) {
            this.data.exercices = [];
            }

            this.data.exercices.push(this.selectedExercice);
          }

    });
    

  }

  deleteExercice(index) {

    this.data.exercices.splice(index, 1);
  }

  annuler() {
    this.dialogRef.close();
  } 

}
