import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var myDoughnutChart = new Chart("myPieChart", {
      type: 'pie',
      data: {
        labels: ["Flexion coude", "Flexion genou"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: [2478,5267]
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'Types d\'exercices',
        }
      }
  });
  }

}
