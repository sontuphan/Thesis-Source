import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AboutComponent],
    exports: [AboutComponent],
})

export class AboutModule { }
