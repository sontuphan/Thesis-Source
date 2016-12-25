'use strict';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

var headers = new Headers({ 'Content-Type': 'application/json' });
export var serverUrl = 'http://localhost:3003/';
export var socketUrl = 'http://localhost:3004/';

export var requestOptions = new RequestOptions({ headers: headers, method: "post" });
export var handleError = function (error: Response) {
    return Observable.throw(error.json().error || ' error');
};

