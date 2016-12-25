import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import globals = require('./../../globals/globals');

@Injectable()
export class TrendService {

    private _chartData: string;

    constructor(private _http: Http) { }

    trend() {
        this._chartData = globals.serverUrl + 'api/getprediction';
        return this._http.get(this._chartData)
            .map(res => res.json())
            .catch(globals.handleError);
    }
}