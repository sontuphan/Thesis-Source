import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TrendComponent } from './trend.component';
import { RouterModule } from '@angular/router';
import { TrendService } from './../../../services/trend/trend.service';
import { SingletonSocket } from './../../../services/socket/socket.service';

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [TrendComponent],
    providers: [TrendService, SingletonSocket],
    exports: [TrendComponent],
})

export class TrendModule { }
