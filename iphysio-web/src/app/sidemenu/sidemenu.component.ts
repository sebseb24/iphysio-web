import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NouveauPatientComponent } from '../popups/nouveau-patient/nouveau-patient.component';
import { AuthService } from '../auth/auth.service';
import { Physio } from '../../../NodeJS/models/physios';
import { Patient } from '../../../NodeJS/models/patients';
import { PatientService } from '../../../NodeJS/services/patients/patient.service';
import { Historique } from '../../../NodeJS/models/historique';
import { HistoriqueService } from '../../../NodeJS/services/historique/historique.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart } from 'node_modules/chart.js';
import { GraphService } from 'NodeJS/services/graph/graph.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})


export class SidemenuComponent implements OnInit {

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

    this.graphService.tempsExercice.data.datasets = [];
    this.graphService.tempsExercice.update();
    }

    if(this.graphService.movementChart) {
      this.graphService.movementChart.data.datasets = [];
      this.graphService.movementChart.update();
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
      
      
          let resultats2 = [{ x: new Date(), y: 1 },
            { x: new Date().setDate(new Date().getDate() - 1), y: 9 },
            { x: new Date().setDate(new Date().getDate() - 4), y: 3 },
            { x: new Date().setDate(new Date().getDate() - 5), y: 2 },
            { x: new Date().setDate(new Date().getDate() - 4), y: 2 },
            { x: stackedDate, y: 2 },]


          
          let start = new Date(),
          end = new Date();
          end.setDate(end.getDate() + 1);      
      
          start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
          start.setHours(0, 0, 0, 0); // set to midnight.         

          this.formatStats(this.graphService.tempsExercice);

        },
        () => {
        });

        this.refreshStats(patient._id);


  }


  barColors = ['rgba(0,128,0, 1)',
  'rgba(238,146,55, 1)',
  'rgba(0,0,0, 1)',
  'rgba(204,0,204, 1)' ]

  formatStats(myChart) {

    myChart.data.datasets = [];

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

  refreshStats(patientId) {
    this.patientService.getStatistics(patientId).subscribe(
      (res) => {
        this.patientService.statsList = res as any[];
        this.formatMovementChart(this.graphService.movementChart);

        if(this.patientService.statsList.length > 0) {
        this.formatPieChart(this.graphService.pieChart);
        } else {
          this.graphService.pieChart.data.labels = ["No data to display"];
          this.graphService.pieChart.data.datasets = [{
            label: "No data",
            backgroundColor: ["#3e95cd"],
            data: [1]
          }];
          this.graphService.pieChart.update();
        }
        


      }, (err) => {
        console.log(err);
      }
    )
  }

  formatPieChart(myChart) {
    let datasets = [{
      label: "Nombre",
      backgroundColor: [],
      data: []
    }];

    let tempLabels = [];


    for(let i = 0; i < this.patientService.statsList.length; i++) {

      tempLabels.push(this.patientService.statsList[i]._id);
      datasets[0].backgroundColor.push(this.barColors[i]);
      datasets[0].data.push(this.patientService.statsList[i].exerciceEndTime.length);
      
    }
    myChart.data.labels = tempLabels;
    myChart.data.datasets = datasets;
    myChart.update();
  }

  formatMovementChart(myChart) {
    let indexCouleur = 0;

    for(let stat of this.patientService.statsList) {
       console.log(stat.exerciceName);

       let result = []; 

       // on commence à 2 car on veut skip l'initialisation
       for(let move = 0; move < stat.movement.length; move++) {
        let moy = 0;
        for(let i = 2; i < stat.movement[move][0].timestampState.length; i++) {

          let endMoveTime =  new Date(stat.movement[move][0].timestampState[i].value).getTime();
          let startMoveTime = new Date(stat.movement[move][0].timestampState[i-1].value).getTime();
  
  
           let deltaTime = endMoveTime - startMoveTime;
           moy += deltaTime; 
 
  
         }
         moy = moy/(stat.movement[move][0].timestampState.length)
         moy = moy / 1000;
  
  
        moy = Math.round(moy);
        console.log(moy);
  
  
        result.push({x: new Date(stat.exerciceEndTime[move]), y : moy});
       }


    let model = {
      fill: false,
      label: stat._id,
      data: result,
      barPercentage: 0.9,
      barThickness: 6,
      minBarLength: 2,
      backgroundColor: this.barColors[indexCouleur],
      borderColor: this.barColors[indexCouleur],
      borderWidth: 1,
      lineTension: 0.1,
    }  

    myChart.data.datasets.push(model);
    myChart.update();
    indexCouleur++;


    }

  }
 
 
  selectEvent(item) {
    this.onSelect(item);
  }
  
  onFocused(e){
    this.refreshPatientList();
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
