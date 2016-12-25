import { Component, AfterViewInit } from '@angular/core';
import { Highcharts } from 'angular2-highcharts';
import { TrackingService } from './../../../services/tracking/tracking.service'

declare var $: any;

@Component({
    selector: 'stackchart',
    templateUrl: 'app/modules/realtime/stackchart/stackchart.component.html',
    styleUrls: ['app/public/css/realtime.css']
})

export class StackChartComponent implements AfterViewInit {

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

    filter(data){
        var TP = 0;
        var TN = 0;
        var FP = 0;
        var FN = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].para == 'TP') {
                TP = data[i].count;
            }
            if (data[i].para == 'TN') {
                TN = data[i].count;
            }
            if (data[i].para == 'FP') {
                FP = data[i].count;
            }
            if (data[i].para == 'FN') {
                FN = data[i].count;
            }
        }
        this.buildChart(FP, TP, FN, TN);
    }

    buildChart(fu, tu, fd, td){
                var width = $(".stackchart").width();
        this.options = {
            title: { text: 'Tracking Prediction Result' },
            subtitle: {
                text: 'Start time: ... to ' + String(new Date())
            },
            chart: {
                type: 'column',
                width: width
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Times'
                },
            },
            tooltip: {
                formatter: function () {
                    return this.series.name + ': ' + this.y + '<br/>' + 'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'False Up',
                data: [fu],
                stack: 'up'
            }, {
                name: 'True Up',
                data: [tu],
                stack: 'up'
            }, {
                name: 'False Down',
                data: [fd],
                stack: 'down'
            }, {
                name: 'True Down',
                data: [td],
                stack: 'down'
            }]
        };
    }
}