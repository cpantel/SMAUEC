import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";

import {AddUserComponent} from "./user/add-user/add-user.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";

import {AddRoleComponent} from "./role/add-role/add-role.component";
import {ListRoleComponent} from "./role/list-role/list-role.component";
import {EditRoleComponent} from "./role/edit-role/edit-role.component";

import {AddRuleComponent} from "./rule/add-rule/add-rule.component";
import {ListRuleComponent} from "./rule/list-rule/list-rule.component";
import {EditRuleComponent} from "./rule/edit-rule/edit-rule.component";

import {AddActionComponent} from "./action/add-action/add-action.component";
import {ListActionComponent} from "./action/list-action/list-action.component";
import {EditActionComponent} from "./action/edit-action/edit-action.component";


import {ListEventComponent} from "./event/list-event/list-event.component";
import {ListActivityComponent} from "./activity/list-activity/list-activity.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },

  { path: 'add-role', component: AddRoleComponent },
  { path: 'list-role', component: ListRoleComponent },
  { path: 'edit-role', component: EditRoleComponent },

  { path: 'add-rule', component: AddRuleComponent },
  { path: 'list-rule', component: ListRuleComponent },
  { path: 'edit-rule', component: EditRuleComponent },

  { path: 'add-action', component: AddActionComponent },
  { path: 'list-action', component: ListActionComponent },
  { path: 'edit-action', component: EditActionComponent },

  { path: 'list-event', component: ListEventComponent },
  { path: 'list-activity', component: ListActivityComponent },

  { path: '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
