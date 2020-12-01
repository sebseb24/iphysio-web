import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/patients/patient.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-movements-graph',
  templateUrl: './movements-graph.component.html',
  styleUrls: ['./movements-graph.component.scss']
})
export class MovementsGraphComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  movementsChart : Chart;

  ngOnInit(): void {

    let resultats = [{ x: new Date(), y: 1 },
      { x: new Date().setDate(new Date().getDate() - 3), y: 6 },
      { x: new Date().setDate(new Date().getDate() - 4), y: 3 },
      { x: new Date().setDate(new Date().getDate() - 5), y: 2 },
      { x: new Date().setDate(new Date().getDate() - 4), y: 2 }]

    let start = new Date(),
    end = new Date();
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

    this.movementsChart.data.datasets.push(resultats);
    this.movementsChart.update();

  }

}
