import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../../NodeJS/models/patients';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ProgrammeExerciceComponent } from '../programme-exercice/programme-exercice.component';
import { PatientService} from '../patients/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../shared/dialog.service';

import { Historique } from '../../../NodeJS/models/historique';
import { HistoriqueService } from '../../../NodeJS/services/historique.service';

import { HistoriqueActiviteComponent } from '../historique-activite/historique-activite.component';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  @Input() patient: Patient;
  
  selectedPatient : Patient;

  constructor(private dialog: MatDialog,
      public patientService : PatientService,
      public historiqueService : HistoriqueService,
      private dialogService : DialogService) { }

  ngOnInit(): void {
    this.selectedPatient = this.patientService.getSelectedPatient();
    this.refreshHistoriqueList();
  }
 
  editProgram(pro ? : any) {

    const dialogConfig = new MatDialogConfig();


    dialogConfig.width = "700px";
    if (pro != null)
      dialogConfig.data = pro;
    else {
      dialogConfig.data = {nom : ""};
    }

    let dialogRef =this.dialog.open(ProgrammeExerciceComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      this.patientService.getProgrammeList(this.patientService.selectedPatient._id).subscribe(
        (res) => {
            console.log("done");
            this.patientService.programmeList= res as any[];
        }, (err) => {
          console.log(err);
        }
      )
    });
  }

  refreshHistoriqueList() {
    /*this.historiqueService.getHistoriqueList(this.patientService.selectedPatient._id).subscribe(
      (res) => {
        this.historiqueService.historique = res as Historique[];
      },
      (err) => {
      });*/
  }

  deleteProgramme(pro) {
    /*if(confirm("voulez vous vraiment supprimer " + pro.nom)) {
      console.log("programme supprimé");
      
      

    }*/

    this.dialogService.openConfirmDialog("Voulez vous vraiment supprimer " + pro.nom + " ?").afterClosed().subscribe( res => {
      if (res) {

        this.patientService.deleteProgrammeExercice(pro._id).subscribe( res => {
          console.log("delete avec succes");
          this.refreshProgrammeList();
  
        });

      } 
    });
  }


  refreshProgrammeList() {

    this.patientService.getProgrammeList(this.patientService.selectedPatient._id).subscribe(
      (res) => {
          console.log("done");
          this.patientService.programmeList= res as any[];
      }, (err) => {
        console.log(err);
      }
    )

  }

  openHistorique(hist) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "700px";
    
    dialogConfig.data = hist;    

    let dialogRef =this.dialog.open(HistoriqueActiviteComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  editPatient(pat: Patient) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "700px";
    
    dialogConfig.data = pat;    

    let dialogRef =this.dialog.open(EditPatientComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);    
    });
  }

  saveNote() {
    //console.log("saved note!");
    console.log(this.patientService.selectedPatient.name);
    this.patientService.putPatient(this.patientService.selectedPatient).subscribe(
      (res) => {
          console.log("done");
          console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
  }

 

}
