import { Injectable } from '@angular/core';
import { Chart } from 'node_modules/chart.js';


@Injectable({
  providedIn: 'root'
})
export class GraphService {

  tempsExercice : Chart;
  movementChart : Chart;
  pieChart : Chart;

  constructor() { }
}
