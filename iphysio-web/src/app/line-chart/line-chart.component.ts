import { Component, OnInit } from '@angular/core';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { GraphService } from 'NodeJS/services/graph.service';
import { Chart } from 'node_modules/chart.js';
import { HistoriqueService } from '../../../NodeJS/services/historique.service';
import { PatientService } from '../patients/patient.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {



  constructor(public historiqueService: HistoriqueService,
    public patientService: PatientService,
    public graphService : GraphService) {

    let stackedDate = new Date();
    stackedDate.setDate(stackedDate.getDate() - 4);
    stackedDate.setHours(2);

    this.resultats = [{ x: new Date(), y: 1 },
    { x: new Date().setDate(new Date().getDate() - 3), y: 6 },
    { x: new Date().setDate(new Date().getDate() - 4), y: 3 },
    { x: new Date().setDate(new Date().getDate() - 5), y: 2 },
    { x: new Date().setDate(new Date().getDate() - 4), y: 2 },
    { x: stackedDate, y: 2 },]

    this.resultats2 = [{ x: new Date(), y: 1 },
      { x: new Date().setDate(new Date().getDate() - 1), y: 9 },
      { x: new Date().setDate(new Date().getDate() - 4), y: 3 },
      { x: new Date().setDate(new Date().getDate() - 5), y: 2 },
      { x: new Date().setDate(new Date().getDate() - 4), y: 2 },
      { x: stackedDate, y: 2 },]


    this.resultats3 = [{ x: new Date(), y: 1 },
        { x: new Date().setDate(new Date().getDate() - 1), y: 55 },
        { x: new Date().setDate(new Date().getDate() - 4), y: 33 },
        { x: new Date().setDate(new Date().getDate() - 5), y: 20 },
        { x: new Date().setDate(new Date().getDate() - 4), y: 2 },
        { x: stackedDate, y: 2 },]



    /*for(let hist of historiqueService.historique) {

    }*/

    /* [{x: new Date(), y : 1},
       {x: new historiqueService.historique., y : 6},
       {x: new Date().setDate(30), y : 3},
       {x: new Date().setDate(31), y : 2},]
       


*/   console.log("changed");
//this.initChart();
//this.refreshHistoriqueList();
  }

  resultats: any;
  resultats2: any;
  resultats3 : any;


  barColors = ['rgba(0,128,0, 1)',
                'rgba(238,146,55, 1)',
                'rgba(0,0,0, 1)',
                'rgba(204,0,204, 1)' ]


  myChart : Chart;

  historique : any[];


  ngOnInit(): void {

    let start = new Date(),
    end = new Date();
    end.setDate(end.getDate() + 1);


    start.setDate(start.getDate() - 2); // set to 'now' minus 7 days.
    start.setHours(0, 0, 0, 0); // set to midnight.
    
    let dataGenou = {
      label: 'Flexion genou',
      data: this.resultats2,
      barPercentage: 0.9,
      barThickness: 6,
      minBarLength: 2,
      backgroundColor: 'rgba(34, 99, 132, 1)',
      borderColor: 'rgba(34, 99, 132, 1)',
      borderWidth: 1
    }  

    let dataBras = {
      label: 'Flexion du bras',
      data: this.resultats3,
      barPercentage: 0.9,
      barThickness: 6,
      minBarLength: 2,
      backgroundColor: 'rgba(255,255,0, 1)',
      borderColor: 'rgba(34, 99, 132, 1)',
      borderWidth: 1
    }
    /*[{
          label: 'Flexion coude',
          data: this.resultats,
          barPercentage: 0.9,
          barThickness: 6,
          minBarLength: 2,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]*/ 
    
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {

        datasets: []
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Durée (en secondes) lors d\'un exercice',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 60
            }
          }],
          xAxes: [{
            type: 'time',
            offset: true,    
            distribution :'series',   

            time: {
              unit: "day"
            },
            ticks: {

              min : start,
              max : end
              
            }
          }]
        }
      }
    });


    //xAxes -> distribution 'series'

    this.graphService.tempsExercice = this.myChart;
    this.graphService.tempsExercice.update();

    //localStorage.setItem('dataMyChart', this.myChart);



    //this.myChart.data.datasets.push(dataGenou);
    //this.myChart.data.datasets.push(dataBras);
    //this.myChart.update();
    //this.refreshHistoriqueList("5f7b9878502734e949258784");
  }

  /*initChart() {

    let start = new Date(),
    end = new Date();
    end.setDate(end.getDate() + 1);


    start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
    start.setHours(0, 0, 0, 0); // set to midnight.
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {

        datasets: []
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Durée (en secondes) lors d\'un exercice',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 60
            }
          }],
          xAxes: [{
            type: 'time',
            distribution: 'series',

            time: {
              unit: "day"
            },
            ticks: {
              min: start,
              max: end,
            }
          }]
        }
      }
    });


  }*/


   /*public refreshHistoriqueList( patId) {//this.patientService.selectedPatient._id)//"5f7b9878502734e949258784"
    this.historiqueService.getHistoriqueList(patId).subscribe(
      (res) => {
        //this.historiqueService.historique = res as any[];//Historique[];
        this.historique = res as any[];
        this.formatStats();
      },
      (err) => {
      });
  }

  /*formatStats() {

    this.myChart.data.datasets = [];
     this.myChart.update();


    let indexCouleur = 0;
    for(let hist of this.historique) {

      let result = []; 

        for(let i = 0; i < hist.date.length; i++) {
          let dureeString = hist.duree[i].substring(0, hist.duree[i].length - 1);
          let duree = Number(dureeString);
        
          
          //result.push({x: new Date().setDate(hist.date[i]), y : duree});
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

      this.myChart.data.datasets.push(model);
      this.myChart.update();
      indexCouleur++;

     


    } 
  }*/


}
