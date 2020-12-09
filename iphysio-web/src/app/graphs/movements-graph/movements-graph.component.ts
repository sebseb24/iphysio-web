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
    this.movementsChart.update();

  }

}
