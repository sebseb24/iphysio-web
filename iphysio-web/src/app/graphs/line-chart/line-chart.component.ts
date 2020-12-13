import { Component, OnInit } from '@angular/core';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { GraphService } from 'NodeJS/services/graph/graph.service';
import { Chart } from 'node_modules/chart.js';
import { HistoriqueService } from '../../../../NodeJS/services/historique/historique.service';
import { PatientService } from '../../../../NodeJS/services/patients/patient.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor(public historiqueService: HistoriqueService,
    public patientService: PatientService,
    public graphService : GraphService) {

  }


  myChart : Chart;

  ngOnInit(): void {

    let start = new Date(),
    end = new Date();
    end.setDate(end.getDate() + 1);


    start.setDate(start.getDate() - 2); 
    start.setHours(0, 0, 0, 0); 
        
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


    this.graphService.tempsExercice = this.myChart;
    this.graphService.tempsExercice.update();    
  }

}
