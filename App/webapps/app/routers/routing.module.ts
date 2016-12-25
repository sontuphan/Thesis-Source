import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './../modules/welcome/welcome.component';
import { RealtimeComponent } from './../modules/realtime/realtime.component';
import { AboutComponent } from './../modules/about/about.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: WelcomeComponent },
    { path: 'realtime', component: RealtimeComponent },
    { path: 'about', component: AboutComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
