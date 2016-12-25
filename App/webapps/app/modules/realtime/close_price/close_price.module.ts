import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClosePriceComponent } from './close_price.component';
import { ChartModule } from 'angular2-highcharts';
import { RouterModule } from '@angular/router';
import { ClosePriceService } from './../../../services/close_price/close_price.service';
import { SingletonSocket } from './../../../services/socket/socket.service';

@NgModule({
    imports: [BrowserModule, RouterModule, ChartModule],
    declarations: [ClosePriceComponent],
    providers: [ClosePriceService, SingletonSocket],
    exports: [ClosePriceComponent],
})

export class ClosePriceModule { }
