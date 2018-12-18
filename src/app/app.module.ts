import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';
import { DashboardComponent } from './_components/_core/dashboard';
import { LoginComponent } from './_components/_user/login';
import { RegisterComponent } from './_components/_user/register';
import { AgentTypeFormComponent } from './_components/_core/agent-type-form';
import { ProfileEditorComponent } from './_components/_user/profile-editor';
import { PswdChangerComponent } from './_components/_user/pswd-changer';
import { AccountDeleterComponent } from './_components/_user/account-deleter';
import { HeaderComponent } from './_components/_layout/header/header.component';
import { MeasurementDetailComponent } from './_components/_core/measurement-detail';
import { PageNotFoundComponent } from './_components/_core/page-not-found';
import { MeasurementMakerComponent } from './_components/_core/measurement-maker';
import { NewMeasurementFormComponent } from './_components/_core/new-measurement-form';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        PlotlyModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        AgentTypeFormComponent,
        ProfileEditorComponent ,
        PswdChangerComponent ,
        AccountDeleterComponent,
        HeaderComponent,
        MeasurementDetailComponent ,
        PageNotFoundComponent,
        MeasurementMakerComponent,
        NewMeasurementFormComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
