import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from '@angular/forms';
import { PatientService } from '../patients/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-programme-exercice',
  templateUrl: './programme-exercice.component.html',
  styleUrls: ['./programme-exercice.component.scss']
})
export class ProgrammeExerciceComponent implements OnInit {

  /*selected = 'option2';

  exerciceFrequence : Number;
  //dateDebut = new FormControl((new Date()).toISOString());
  dateDebut : Date;
  dateFin : Date;
  exerciceNom : String;
  exercType : String;*/
  
  
  exercices : any[];
  
  
  /*programme : any;

  lundi : boolean;
  mardi : boolean;
  mercredi : boolean;
  jeudi: boolean;
  vendredi : boolean;
  samedi : boolean;
  dimanche : boolean;*/


  selectedExercice : any;


  sauvegarderOptions : String;
  isNewExercice : boolean;


  

  constructor(private dialogRef: MatDialogRef<ProgrammeExerciceComponent>, 
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

    this.isNewExercice = false;

    this.selectedExercice = exer;
    //this.selectedExercice.index = i;

    /*this.dateDebut = new Date(exer.dateDebut); 
    this.dateFin = new Date(exer.dateFin);
    this.exerciceNom = exer.nom;
    this.exerciceFrequence = exer.repetition;
    //this.exercType = exer.refExercice.nom;
    this.lundi = true;
    this.mardi = true;
    this.mercredi = true;
    this.jeudi = true;
    this.vendredi = true;
    this.samedi = true;
    this.dimanche = true;

    console.log(exer);


    this.dateDebut = new Date(exer.dateDebut); 
    this.dateFin = new Date(exer.dateFin);
    this.exerciceNom = exer.nom;
    this.exerciceFrequence = exer.repetition;
    //this.exercType = exer.refExercice.nom;
    this.lundi = true;
    this.mardi = true;
    this.mercredi = true;
    this.jeudi = true;
    this.vendredi = true;
    this.samedi = true;
    this.dimanche = true;*/

    console.log(i);

    this.sauvegarderOptions = "Mettre à jour";
  }

  ajoutElement() {
    /*this.data.exercices.push( {nom : "bonjour",
                              dateDebut : "2020-02-01",
                              dateFin : "2020-02-02",
                              repetition : 2,
                              refExercice : {nom: "test"},
                              lundi : true,
                              mardi : true,
                              mercredi : true,
                              jeudi : true,
                              vendredi : true,
                              samedi : true,
                              dimanche : true
                              });*/

    if(this.data.exercices == null) {
      this.data.exercices = [];
    }

    this.data.exercices.push(this.selectedExercice);
    console.log(this.data.exercices);
  }


  newExercice(ex) {
    this.isNewExercice = true;
    this.sauvegarderOptions = "Ajouter";
    this.selectedExercice = {refExercice : ex.name,
                            nom : ex.name};
  }

  deleteExercice(index) {
    console.log(index);

    this.data.exercices.splice(index, 1);
  }

}
