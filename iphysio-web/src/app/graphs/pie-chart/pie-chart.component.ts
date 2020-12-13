import { Component, OnInit } from '@angular/core';
import { GraphService } from 'NodeJS/services/graph/graph.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor(public graphService : GraphService) { }

  myDoughnutChart : Chart;

  ngOnInit(): void {

    this.myDoughnutChart = new Chart("myPieChart", {
      type: 'pie',
      data: {
        labels: [],
        datasets: []
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

    let datasets = [{
      label: "No data to display",
      backgroundColor: ["#3e95cd"],
      data: [1]
    }];
    this.myDoughnutChart.data.labels.push("No data to display");
    this.myDoughnutChart.data.datasets = datasets;
    this.myDoughnutChart.update();

    this.graphService.pieChart = this.myDoughnutChart;
  }

}
