import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './_components/_core/dashboard';
import { LoginComponent } from './_components/_user/login';
import { RegisterComponent } from './_components/_user/register';
import { AuthGuard } from './_guards';
import {CollectorComponent} from "./_components/_core/collector/collector.component";
import {ProfileEditorComponent} from "./_components/_user/profile-editor";
import {PswdChangerComponent} from "./_components/_user/pswd-changer";
import {AccountDeleterComponent} from "./_components/_user/account-deleter";
import {AgentTypeFormComponent} from "./_components/_core/agent-type-form/agent-type-form.component";
import {Constants} from "./_components/_core/Constants";
import {MeasurementDetailComponent} from "./_components/_core/measurement-detail/measurement-detail.component";
import {PageNotFoundComponent} from "./_components/_core/page-not-found/page-not-found.component";

const appRoutes: Routes = [
    { path: Constants.ROUTE_IDENTIFIER_ROOT,
      component: DashboardComponent, canActivate: [AuthGuard]
    },
    { path: Constants.ROUTE_IDENTIFIER_DASHBOARD,
      component: DashboardComponent, canActivate: [AuthGuard]
    },
    { path: `${Constants.ROUTE_IDENTIFIER_MEASUREMENT_DETAIL}/:id`,
      component: MeasurementDetailComponent, canActivate: [AuthGuard], pathMatch: 'full'
    },
    { path: Constants.ROUTE_IDENTIFIER_MEASUREMENT,
      component: CollectorComponent, canActivate: [AuthGuard]
    },
    { path: Constants.ROUTE_IDENTIFIER_AGENT_TYPE_EDITOR,
      component: AgentTypeFormComponent, canActivate: [AuthGuard]
    },

    // User stuff
    { path: Constants.ROUTE_IDENTIFIER_LOGIN,
      component: LoginComponent
    },
    { path: Constants.ROUTE_IDENTIFIER_REGISTER,
      component: RegisterComponent
    },
    { path: Constants.ROUTE_IDENTIFIER_EDIT_PROFILE,
      component: ProfileEditorComponent, canActivate: [AuthGuard]
    },
    { path: Constants.ROUTE_IDENTIFIER_PASSWORD_CHANGE,
      component: PswdChangerComponent, canActivate: [AuthGuard]
    },
    { path: Constants.ROUTE_IDENTIFIER_DELETE_ACCOUNT,
      component: AccountDeleterComponent, canActivate: [AuthGuard]
    },

    // otherwise redirect to /
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
