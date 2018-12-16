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
import { CollectorComponent } from './_components/_core/collector/collector.component';
import { AgentTypeFormComponent } from './_components/_core/agent-type-form/agent-type-form.component';
import { ProfileEditorComponent } from './_components/_user/profile-editor';
import { PswdChangerComponent } from './_components/_user/pswd-changer';
import { AccountDeleterComponent } from './_components/_user/account-deleter';
import { HeaderComponent } from './_components/_layout/header/header.component'
;
import { MeasurementDetailComponent } from './_components/_core/measurement-detail/measurement-detail.component'
;
import { PageNotFoundComponent } from './_components/_core/page-not-found/page-not-found.component'@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        AgentTypeFormComponent,
        CollectorComponent,
        ProfileEditorComponent ,
        PswdChangerComponent ,
        AccountDeleterComponent,
        HeaderComponent
,
        MeasurementDetailComponent ,
        PageNotFoundComponent   ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
