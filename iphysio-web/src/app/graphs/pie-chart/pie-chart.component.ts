import { Component, OnInit } from '@angular/core';
import { GraphService } from 'NodeJS/services/graph.service';
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
    /*var myDoughnutChart = new Chart("myPieChart", {
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
    });*/

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
    //this.myDoughnutChart.data.labels.push("Flexion genou");
    this.myDoughnutChart.data.datasets = datasets;
    this.myDoughnutChart.update();



    this.graphService.pieChart = this.myDoughnutChart;





  }

}
