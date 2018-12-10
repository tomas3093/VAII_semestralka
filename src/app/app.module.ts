import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { FooterComponent } from './footer';
import { UserManagerComponent } from './user-manager';
import { CollectorComponent } from './collector/collector.component';;
import { AgentTypeFormComponent } from './agent-type-form/agent-type-form.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        UserManagerComponent,
        AgentTypeFormComponent,
        CollectorComponent
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
