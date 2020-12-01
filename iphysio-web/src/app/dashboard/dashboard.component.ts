import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NouveauPatientComponent } from '../nouveau-patient/nouveau-patient.component';
import { AuthService } from '../auth/auth.service';
import { Physio } from '../../../NodeJS/models/physios';
import { Patient } from '../../../NodeJS/models/patients';
import { PatientService } from '../patients/patient.service';
import { Historique } from '../../../NodeJS/models/historique';
import { HistoriqueService } from '../../../NodeJS/services/historique.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { Chart } from 'node_modules/chart.js';
import * as $ from 'jquery';
import { ChatroomComponent } from '../chatroom/chatroom.component';
import { GraphService } from 'NodeJS/services/graph.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  connectedUser = new Physio;
  keyword = 'name';
  data: Patient[];

  dispArchive : boolean;
  dispPatientDetail : boolean;
  
  myChart : Chart;
 
  constructor(private dialog: MatDialog, private _authService: AuthService, 
    public patientService: PatientService, public historiqueService: HistoriqueService,private _router: Router,
    public graphService : GraphService) {
  }

  ngOnInit(): void {
    this.connectedUser.name = localStorage.getItem('username');
    this.connectedUser._id = localStorage.getItem('_id');
    this.refreshPatientList();    
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.height = "inherit"
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.dialog.open(NouveauPatientComponent, dialogConfig);
  }

  onLogout() {
    this._authService.logoutUser();
  }

  onSelect(patient: Patient): void {

    this.displayPatientDetail();

    this.patientService.selectedPatient = patient;

    if(this.graphService.tempsExercice) {
    //this.graphService.tempsExercice.clear();
    this.graphService.tempsExercice.data.datasets = [];
    this.graphService.tempsExercice.update();
    }

    this.patientService.getProgrammeList(patient._id).subscribe(
      (res) => {
        this.patientService.programmeList= res as any[];
        console.log(this.patientService.programmeList);
      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
          }
        }
      });

      this.historiqueService.getHistoriqueList(this.patientService.selectedPatient._id).subscribe(
        (res) => {
          this.historiqueService.historique = res as Historique[];

          let stackedDate = new Date();
          stackedDate.setDate(stackedDate.getDate() - 4);
          stackedDate.setHours(2);
      
          let resultats = [{ x: new Date(), y: 1 },
          { x: new Date().setDate(new Date().getDate() - 3), y: 6 },
          { x: new Date().setDate(new Date().getDate() - 4), y: 3 },
          { x: new Date().setDate(new Date().getDate() - 5), y: 2 },
          { x: new Date().setDate(new Date().getDate() - 4), y: 2 },
          { x: stackedDate, y: 2 },]
      
          let resultats2 = [{ x: new Date(), y: 1 },
            { x: new Date().setDate(new Date().getDate() - 1), y: 9 },
            { x: new Date().setDate(new Date().getDate() - 4), y: 3 },
            { x: new Date().setDate(new Date().getDate() - 5), y: 2 },
            { x: new Date().setDate(new Date().getDate() - 4), y: 2 },
            { x: stackedDate, y: 2 },]

            let dataGenou = {
              label: 'Flexion genou',
              data: resultats2,
              barPercentage: 0.9,
              barThickness: 6,
              minBarLength: 2,
              backgroundColor: 'rgba(34, 99, 132, 1)',
              borderColor: 'rgba(34, 99, 132, 1)',
              borderWidth: 1
            }  

          
          let start = new Date(),
          end = new Date();
          end.setDate(end.getDate() + 1);      
      
          start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
          start.setHours(0, 0, 0, 0); // set to midnight.         

          this.formatStats(this.graphService.tempsExercice);

        },
        (err) => {
        });
  }
  barColors = ['rgba(0,128,0, 1)',
  'rgba(238,146,55, 1)',
  'rgba(0,0,0, 1)',
  'rgba(204,0,204, 1)' ]

  formatStats(myChart) {

    myChart.data.datasets = [];
    //myChart.update();


    let indexCouleur = 0;
    for(let hist of this.historiqueService.historique) {

      let result = []; 

        for(let i = 0; i < hist.date.length; i++) {
          let dureeString = hist.duree[i].substring(0, hist.duree[i].length - 1);
          let duree = Number(dureeString);
        
          result.push({x: new Date(hist.date[i]), y : duree});
        }
        
      console.log(result);
      let model = {
        label: hist._id,
        data: result,
        barPercentage: 0.9,
        barThickness: 6,
        minBarLength: 2,
        backgroundColor: this.barColors[indexCouleur],
        borderColor: 'rgba(34, 99, 132, 1)',
        borderWidth: 1
      }  

      myChart.data.datasets.push(model);
      myChart.update();
      indexCouleur++;

     


    }
  }

  refreshPatientList() {
    this.patientService.getPatientList(localStorage.getItem('_id')).subscribe(
      (res) => {
        this.patientService.patients = res as Patient[];
        this.data = this.patientService.patients;
      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
            localStorage.removeItem('token');
            this._router.navigate(['/login']);
          }
        }
      });
  }
 
 
  selectEvent(item) {
    this.onSelect(item);
  }
  
  onFocused(e){
    this.refreshPatientList();
    console.log("onChangeSearch : " + e);
  }

  displayArchive() {
    this.clearDisplay();
    this.dispArchive = true;
  }

  displayPatientDetail() {
    this.clearDisplay();
    this.dispPatientDetail = true;
  }

  clearDisplay() {
    this.dispPatientDetail = false;
    this.dispArchive = false;
  }

}
