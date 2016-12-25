import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routers/routing.module';
import { HttpModule, JsonpModule } from '@angular/http';

import { WelcomeModule } from './modules/welcome/welcome.module'
import { HeaderModule } from './modules/header/header.module'
import { FooterModule } from './modules/footer/footer.module'
import { AboutModule } from './modules/about/about.module'
import { RealtimeModule } from './modules/realtime/realtime.module'


@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule,
    HttpModule, JsonpModule,
    HeaderModule, FooterModule, WelcomeModule,
    AboutModule, RealtimeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
