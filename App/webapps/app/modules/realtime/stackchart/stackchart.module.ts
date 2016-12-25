import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StackChartComponent } from './stackchart.component';
import { ChartModule } from 'angular2-highcharts';
import { RouterModule } from '@angular/router';
import { TrackingService } from './../../../services/tracking/tracking.service'

@NgModule({
    imports: [BrowserModule, RouterModule, ChartModule],
    declarations: [StackChartComponent],
    providers: [TrackingService],
    exports: [StackChartComponent],
})

export class StackChartModule { }
