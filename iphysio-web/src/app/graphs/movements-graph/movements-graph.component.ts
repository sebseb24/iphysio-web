import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../NodeJS/services/patients/patient.service';
import { Chart } from 'node_modules/chart.js';
import { GraphService } from 'NodeJS/services/graph/graph.service';

@Component({
  selector: 'app-movements-graph',
  templateUrl: './movements-graph.component.html',
  styleUrls: ['./movements-graph.component.scss']
})
export class MovementsGraphComponent implements OnInit {

  constructor(public patientService: PatientService,
              public graphService : GraphService) { }

  movementsChart : Chart;

  ngOnInit(): void {

    let resultats = [{ x: new Date(), y: 30 },
      { t: new Date().setDate(new Date().getDate() - 3), y: 55 },
      { t: new Date().setDate(new Date().getDate() - 4), y: 45 },
      { t: new Date().setDate(new Date().getDate() - 4), y: 33},
      { t: new Date().setDate(new Date().getDate() - 5), y: 10 }];


      let resultats3 = [{ x: new Date().setDate(new Date().getDate() - 5), y: 1 },
        { x: new Date().setDate(new Date().getDate() - 4), y: 55 },
        { x: new Date().setDate(new Date().getDate() - 3), y: 33 },
        { x: new Date().setDate(new Date().getDate() - 2), y: 20 },
        { x: new Date().setDate(new Date().getDate() - 1), y: 2 }]

      let dataBras = {
        fill: false,
        label: 'Exercice du bras',
        data: resultats,
        barPercentage: 0.9,
        barThickness: 6,
        minBarLength: 2,
        backgroundColor: 'rgba(255,255,0, 1)',
        borderColor: 'rgba(34, 99, 132, 1)',
        borderWidth: 1,
        lineTension: 0.1,
      }


      let dataJambe = {
        fill: false,
        label: 'Exercice de la jambe',
        data: resultats3,
        barPercentage: 0.9,
        barThickness: 6,
        minBarLength: 2,
        backgroundColor: 'rgba(1,1,0, 1)',
        borderColor: 'rgba(1, 1, 1, 1)',
        borderWidth: 1,
        lineTension: 0.1,
      }

    let start = new Date();
    start.setDate(start.getDate() - 5);
    let end = new Date();
    end.setDate(end.getDate() + 1);

    this.movementsChart = new Chart("movementsChart", {
      type: 'line',
      data: {

        datasets: []
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Temps moyen pour effectuer un mouvement lors d\'un exercice',
        },
        scales: {
          yAxes: [{
          
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 12
            }
          }],
          xAxes: [{
            type: 'time',

            time: {
              unit: "day",
              unitStepSize: 1,
            },
            ticks: {
              min: start,
              max: end,
              source: 'auto'
            }
          }]
        }
      }
    });

    this.graphService.movementChart = this.movementsChart;

    //this.movementsChart.data.datasets.push(dataBras);
    //this.movementsChart.data.datasets.push(dataJambe);
    this.movementsChart.update();

  }

}
