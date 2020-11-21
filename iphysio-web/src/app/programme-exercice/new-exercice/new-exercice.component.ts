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
  public TempoOptions : any[];

  public descMoves : String[];

  constructor(
    private dialogRef: MatDialogRef<NewExerciceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService : PatientService
    ) { 
      this.selectedExercice = data.exercice;

      this.descMoves = ["bras gauche", "bras droit"];

      if(this.selectedExercice.refExercice.movements.length == 1) {

        if(this.selectedExercice.refExercice.movements[0].bodyPart0 == "L_SHOULDER" || 
          this.selectedExercice.refExercice.movements[0].bodyPart0 == "L_ELBOW" || 
          this.selectedExercice.refExercice.movements[0].bodyPart0 == "L_WRIST") {

            this.descMoves[0] = "bras gauche";
          } else if(this.selectedExercice.refExercice.movements[0].bodyPart0 == "R_SHOULDER" || 
          this.selectedExercice.refExercice.movements[0].bodyPart0 == "R_ELBOW" || 
          this.selectedExercice.refExercice.movements[0].bodyPart0 == "R_WRIST") {
            this.descMoves[0] = "bras droit";
          }
      } else if(this.selectedExercice.refExercice.movements.length == 2) {
        this.descMoves[0] = "bras gauche";
        this.descMoves[1] = "bras droit";
      }
      
      this.TempoOptions = [{
        viewValue : "Lent",
        detail : "2 secondes et plus",
        value : 1
      },{
        viewValue : "Moyen",
        detail : "2 à 10 secondes",
        value : 2
      },{
        viewValue : "Rapide",
        detail : "moins de 4 secondes",
        value : 3
      }];

      if(data.option.isNewExercice == true){

        this.selectedExercice.parametres.tempo = {value : 1, min : 2, max : 999999999};
       
        this.selectedExercice.parametres.angle = {};
        this.selectedExercice.parametres.angle = {isAntiClockWise : true, debut : 180, fin : 90};

        if(this.selectedExercice.refExercice.movements.length > 1) {
          this.selectedExercice.parametres.angle2 = {};
          this.selectedExercice.parametres.angle2 = {isAntiClockWise : true, debut : 180, fin : 90};
        }

        if(this.selectedExercice.refExercice.type == "repetition") {
            this.selectedExercice.parametres.repetition = 1;
        } else if(this.selectedExercice.refExercice.type == "chrono") {
            this.selectedExercice.parametres.duree = 30;
        }



        this.btnSauvegardeMsg = "Ajouter";
      }
      else {


        if(!this.selectedExercice.parametres.tempo) {
          this.selectedExercice.parametres.tempo =  {value : 1};
        }

        if(!this.selectedExercice.parametres.angle) {
          this.selectedExercice.parametres.angle = {};
          this.selectedExercice.parametres.angle = {isAntiClockWise : true, debut : 180, fin : 90, membre : "brasGauche"};
        } 

        this.btnSauvegardeMsg = "Modifier"
      }
    }

  ngOnInit(): void {
  }

  ajoutElement() {

    this.data.exercice = this.selectedExercice;
    this.dialogRef.close("OK");
  }

  onTempoChange(val) {
    console.log(val);

    if(val == 1) {
      this.selectedExercice.parametres.tempo.min = 2,
      this.selectedExercice.parametres.tempo.max = 999999999
    } else if(val == 2) {
      this.selectedExercice.parametres.tempo.min = 2,
      this.selectedExercice.parametres.tempo.max = 10
    } else if(val == 3) {
      this.selectedExercice.parametres.tempo.min = 0,
      this.selectedExercice.parametres.tempo.max = 4
    }
  }

  annuler() {
    this.dialogRef.close();
  }



}
