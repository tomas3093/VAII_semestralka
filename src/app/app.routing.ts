import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {UserManagerComponent} from "./user-manager";
import {CollectorComponent} from "./collector/collector.component";

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'measurement', component: CollectorComponent, canActivate: [AuthGuard] },

    // User stuff
    { path: 'user-manager', component: UserManagerComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to /
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
