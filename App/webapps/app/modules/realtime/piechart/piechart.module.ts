import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PiechartComponent } from './piechart.component';
import { ChartModule } from 'angular2-highcharts';
import { RouterModule } from '@angular/router';
import { TrackingService } from './../../../services/tracking/tracking.service'

@NgModule({
    imports: [BrowserModule, RouterModule, ChartModule],
    declarations: [PiechartComponent],
    providers: [TrackingService],
    exports: [PiechartComponent],
})

export class PiechartModule { }
