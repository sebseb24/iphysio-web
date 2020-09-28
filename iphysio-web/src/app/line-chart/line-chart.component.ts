import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        
        datasets: [{
          label: '# of Votes',
          data: [{x: new Date(), y : 1},
            {x: new Date().setDate(25), y : 6},
            {x: new Date().setDate(30), y : 3},
            {x: new Date().setDate(31), y : 2},],
          backgroundColor: [
            'rgba(255, 99, 132, 0)',
            'rgba(54, 162, 235, 0)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            type: 'time',
            time: {
                displayFormats: {
                    quarter: 'MMM YYYY'
                }
            }
        }]
        }
      }
    });
  }

}
