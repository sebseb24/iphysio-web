import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { PatientService } from '../patients/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

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

  fermer() {
      this.dialogRef.close();
  }

  refreshExerciceList() {
    this.patientService.getExerciceList().subscribe(
      (res) => {
        this.exercices = res as any[];
        console.log(this.exercices);
      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
            //localStorage.removeItem('token');
            //this._router.navigate(['/login']);
            console.log(err);
          }
        }
      });
  }

  saveCurrentExercice() {
  }

  showExerciceParam(exer, i) {
    const dialogConfig = new MatDialogConfig();

    this.selectedExercice = exer;   

    dialogConfig.data = {};
    dialogConfig.data.exercice = this.selectedExercice;
    
    dialogConfig.data.option = {};
    dialogConfig.data.option.isNewExercice = false;

    dialogConfig.width = "900px";

    let dialogRef = this.dialog.open(NewExerciceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  newExercice(exercice : any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = "900px";

     //this.sauvegarderOptions = "Ajouter";
     this.selectedExercice = {refExercice : exercice.name,
                             nom : exercice.name};

    dialogConfig.data = {};
    dialogConfig.data.option = {};
    dialogConfig.data.option.isNewExercice = true;

    dialogConfig.data.exercice = this.selectedExercice;//exercice;

    let dialogRef = this.dialog.open(NewExerciceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if(result == "OK") {
            if(this.data.exercices == null) {
            this.data.exercices = [];
            }

            this.data.exercices.push(this.selectedExercice);
          }

    });
    

  }

  deleteExercice(index) {
    console.log(index);

    this.data.exercices.splice(index, 1);
  }

}
