import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './_components/_core/dashboard';
import { LoginComponent } from './_components/_user/login';
import { RegisterComponent } from './_components/_user/register';
import { AuthGuard } from './_guards';
import {CollectorComponent} from "./_components/_core/collector/collector.component";
import {ProfileEditorComponent} from "./_components/_user/profile-editor/profile-editor.component";
import {PswdChangerComponent} from "./_components/_user/pswd-changer/pswd-changer.component";
import {AccountDeleterComponent} from "./_components/_user/account-deleter/account-deleter.component";

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'measurement', component: CollectorComponent, canActivate: [AuthGuard] },

    // User stuff
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'edit-profile', component: ProfileEditorComponent, canActivate: [AuthGuard] },
    { path: 'change-password', component: PswdChangerComponent, canActivate: [AuthGuard] },
    { path: 'delete-account', component: AccountDeleterComponent, canActivate: [AuthGuard] },

    // otherwise redirect to /
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
