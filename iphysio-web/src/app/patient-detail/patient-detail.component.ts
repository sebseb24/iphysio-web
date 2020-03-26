import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../patient';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ProgrammeExerciceComponent } from '../programme-exercice/programme-exercice.component';
import { PatientService} from '../patients/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../shared/dialog.service';



@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  @Input() patient: Patient;

  selectedPatient : any;
  //listeProgramme : any[];

  constructor(private dialog: MatDialog,
      public patientService : PatientService,
      private dialogService : DialogService) { }

  ngOnInit(): void {
    this.selectedPatient = this.patientService.getSelectedPatient();
    //this.listeProgramme = this.patientService.programmeList;

  }

  editProgram(pro ? : any) {

    const dialogConfig = new MatDialogConfig();


    //dialogConfig.width = "700px";
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

 

}
