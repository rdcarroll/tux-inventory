
import { Component, Input, OnInit, AfterViewInit, OnChanges} from '@angular/core';
import Chart = require('chart.js');


@Component({
    selector: 'my-chart',
    templateUrl: './chart.component.html'
})
export class MyChartComponent implements AfterViewInit, OnChanges, OnInit {
    @Input() id: string;
    @Input() chartType: string;
    @Input() fstlye: any;
    @Input() data: any;
    @Input() labels: any;

    chart: Chart;
    ChartColors: any = ['blue', 'red', 'orange', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'];

    constructor() {
        this.id = this.id || 'my-chart';
        this.labels = this.labels || [];
        this.chartType = this.chartType || 'line';
        this.fstlye = this.fstlye || { position: 'relative', height: 'auto', width: 'auto' };
    }

    updateChart(): void {
        var ds: any = {
            labels: this.labels,
            datasets: []
        };
        if (this.data != null) {
            for (var i = 0; i < this.data.length; i++) {
                var _ds: any = {
                    label: this.data[i].label, data: this.data[i].data,
                    fill: false, spanGaps: true,
                    backgroundColor: this.ChartColors[i],
                    borderColor: this.ChartColors[i]
                }
                ds.datasets.push(_ds);
            }
        } 

        if (typeof this.chart !== 'undefined') {
            this.chart.config.type = this.chartType;
            this.chart.config.options.responsive = true;
            this.chart.config.options.maintainAspectRatio = false;
            this.chart.data.labels = ds.labels;
            this.chart.data.datasets = ds.datasets;
            this.chart.update();
        }
    }

    ngAfterViewInit() {
        if (typeof this.chart == 'undefined') {
            this.chart = new Chart(this.id, { });
            this.updateChart();
        }
    }

    ngOnInit(): void {
        //this.updateChart();
    }
    ngOnChanges(): void {
        this.updateChart();
    }
}

