import { Component, AfterViewInit } from '@angular/core';
import { Highcharts } from 'angular2-highcharts';
import { TrackingService } from './../../../services/tracking/tracking.service'

declare var $: any;

@Component({
    selector: 'piechart',
    templateUrl: 'app/modules/realtime/piechart/piechart.component.html',
    styleUrls: ['app/public/css/realtime.css']
})

export class PiechartComponent implements AfterViewInit {

    chart: any;
    options: any;

    constructor(private _trackingService: TrackingService) {

    }

    ngAfterViewInit() {
        this._trackingService.getAccuracy().subscribe(
            data => this.filter(data),
            error => console.log("Error HTTP Post Service")
        )
    }

    filter(data) {
        var T = 0;
        var F = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].para == 'TP' || data[i].para == 'TN') {
                T = T + data[i].count;
            }
            if (data[i].para == 'FP' || data[i].para == 'FN') {
                F = F + data[i].count;
            }
        }
        this.buildChart(F, T);
    }

    buildChart = function (a, b) {
        var width = $(".piechart").width();
        this.options = {
            title: { text: 'Tracking Prediction Result' },
            subtitle: {
                text: 'Start time: ... to ' + String(new Date())
            },
            chart: {
                type: 'pie',
                width: width
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Count',
                data: [{
                    name: 'False',
                    y: a
                }, {
                    name: 'True',
                    y: b
                }]
            }]
        };
    }

}