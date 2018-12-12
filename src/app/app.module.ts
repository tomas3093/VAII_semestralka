import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
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
import { ProfileEditorComponent } from './_components/_user/profile-editor/profile-editor.component';
import { PswdChangerComponent } from './_components/_user/pswd-changer/pswd-changer.component';
import { AccountDeleterComponent } from './_components/_user/account-deleter/account-deleter.component'
;
import { HeaderComponent } from './_components/_layout/header/header.component'

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
        AgentTypeFormComponent,
        CollectorComponent,
        ProfileEditorComponent ,
        PswdChangerComponent ,
        AccountDeleterComponent
,
        HeaderComponent    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
