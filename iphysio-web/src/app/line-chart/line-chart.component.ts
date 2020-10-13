import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { HistoriqueService } from '../../../NodeJS/services/historique.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {



  constructor(public historiqueService: HistoriqueService) {

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



    /*for(let hist of historiqueService.historique) {

    }*/

    /* [{x: new Date(), y : 1},
       {x: new historiqueService.historique., y : 6},
       {x: new Date().setDate(30), y : 3},
       {x: new Date().setDate(31), y : 2},]
*/
  }

  resultats: any;
  resultats2: any;


  ngOnInit(): void {

    let start = new Date(),
    end = new Date();
    end.setDate(end.getDate() + 1);


    start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
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
    
    
    
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {

        datasets: [{
          label: 'Flexion coude',
          data: this.resultats,
          barPercentage: 0.9,
          barThickness: 6,
          minBarLength: 2,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Score obtenu lors d\'un exercice',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 10
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

    myChart.data.datasets.push(dataGenou);
    myChart.update();
  }

}
