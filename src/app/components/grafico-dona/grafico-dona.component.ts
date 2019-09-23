import { Component, OnInit, Input } from '@angular/core';

import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() leyenda:string = "leyenda";
  @Input() doughnutChartData:any;
  @Input() doughnutChartLabels:any;
  @Input() doughnutChartType:any;

  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];
  // public doughnutChartType: ChartType = 'doughnut';

  

  constructor() { }

  ngOnInit() {
  }

}
