import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RealtimeComponent } from './realtime.component';

import { ClosePriceModule } from './close_price/close_price.module'
import { StackChartModule } from './stackchart/stackchart.module';
import { PiechartModule } from './piechart/piechart.module';
import { TrendModule } from './trend/trend.module';

@NgModule({
    imports: [
        BrowserModule, ClosePriceModule, StackChartModule,
        PiechartModule, TrendModule
    ],
    declarations: [RealtimeComponent],
    exports: [RealtimeComponent],
})

export class RealtimeModule { }
