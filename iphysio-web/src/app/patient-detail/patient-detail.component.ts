import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../../NodeJS/models/patients';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ProgrammeExerciceComponent } from '../programme-exercice/programme-exercice.component';
import { PatientService} from '../../../NodeJS/services/patients/patient.service';
import { DialogService } from '../popups/confirm-dialog/dialog.service';

import { HistoriqueService } from '../../../NodeJS/services/historique/historique.service';

import { HistoriqueActiviteComponent } from '../popups/historique-activite/historique-activite.component';
import { EditPatientComponent } from '../popups/edit-patient/edit-patient.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GraphService } from 'NodeJS/services/graph/graph.service';


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
      public graphService : GraphService,
      private dialogService : DialogService) {       
        
       }

  ngOnInit(): void {
    this.selectedPatient = this.patientService.getSelectedPatient();    
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


    dialogRef.afterClosed().subscribe(() => {
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

    this.dialogService.openConfirmDialog("Voulez vous vraiment supprimer " + pro.nom + " ?").afterClosed().subscribe( res => {
      if (res) {

        this.patientService.deleteProgrammeExercice(pro._id).subscribe( () => {
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


    dialogRef.afterClosed().subscribe(() => {
      
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

  dateStartChange(type: string, event: MatDatepickerInputEvent<Date>) {

    this.graphService.movementChart.options.scales.xAxes[0].ticks.min = event.value;
    this.graphService.tempsExercice.options.scales.xAxes[0].ticks.min = event.value;

    this.graphService.movementChart.update();
    this.graphService.tempsExercice.update();

  }

  dateEndChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(type + ":"  + event.value);

    this.graphService.movementChart.options.scales.xAxes[0].ticks.max = event.value;
    this.graphService.movementChart.update();
    this.graphService.tempsExercice.options.scales.xAxes[0].ticks.max = event.value;
    this.graphService.tempsExercice.update();

  }




 

}
