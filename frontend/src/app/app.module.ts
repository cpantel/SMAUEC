import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';

import { AddRoleComponent } from './role/add-role/add-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';

import { AddRuleComponent } from './rule/add-rule/add-rule.component';
import { EditRuleComponent } from './rule/edit-rule/edit-rule.component';
import { ListRuleComponent } from './rule/list-rule/list-rule.component';

import { AddActionComponent } from './action/add-action/add-action.component';
import { EditActionComponent } from './action/edit-action/edit-action.component';
import { ListActionComponent } from './action/list-action/list-action.component';

import { ListEventComponent} from './event/list-event/list-event.component';
import { ListActivityComponent} from './activity/list-activity/list-activity.component';

import { LoginComponent } from './login/login.component';
import { ApiService } from "./service/api.service";
import {routing} from "./app.routing";

import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./core/interceptor";
//import { EventComponent } from './event/event.component';
//import { RoleComponent } from './role/role.component';
//import { RuleComponent } from './rule/rule.component';
//import { ActionComponent } from './action/action.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    LoginComponent,
    ListEventComponent,
    ListActivityComponent,
    AddRoleComponent,
    EditRoleComponent,
    ListRoleComponent,
    AddRuleComponent,
    EditRuleComponent,
    ListRuleComponent,
    AddActionComponent,
    EditActionComponent,
    ListActionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    ApiService,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
