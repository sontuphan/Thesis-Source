import { Component, AfterViewInit } from '@angular/core';
import { TrendService } from './../../../services/trend/trend.service'
import { SingletonSocket } from './../../../services/socket/socket.service'

declare var $: any;

@Component({
    selector: 'trend',
    templateUrl: 'app/modules/realtime/trend/trend.component.html',
    styleUrls: ['app/public/css/realtime.css']
})

export class TrendComponent implements AfterViewInit {

    time: any;
    value: any;
    proba: any;

    constructor(private _trendService: TrendService, private _singletonSocket: SingletonSocket) {
        this.time = null;
        this.value = null;
        this.proba = null;
    }

    ngAfterViewInit() {
        this._trendService.trend().subscribe(
            data => this.filter(data),
            error => console.log("Error HTTP Post Service")
        )
        var self = this;
        this._singletonSocket.getDataFromSocket('prediction', function(re){
            self.filter(re);
        })
    }

    filter(data) {
        this.time = new Date(data.time);
        this.value = data.value == 0 ? 'Down': 'Up';
        this.proba = data.proba * 100;
    }
}