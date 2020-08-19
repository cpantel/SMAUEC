import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../model/user.model";
import { Role } from "../model/role.model";
import { Rule } from "../model/rule.model";
import { Action } from "../model/action.model";
import { Event } from "../model/event.model";
import { Activity } from "../model/activity.model";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  authBaseUrl:     string = 'http://api-users.smauec.net/api/auth/';
  userBaseUrl:     string = 'http://api-users.smauec.net/api/users/';
  roleBaseUrl:     string = 'http://api-users.smauec.net/api/roles/';

  ruleBaseUrl:     string = 'http://api-rules.smauec.net/api/rules/';
  actionBaseUrl:   string = 'http://api-rules.smauec.net/api/actions/';


  eventBaseUrl:    string = 'http://api-events.smauec.net/api/events/';
  activityBaseUrl: string = 'http://api-events.smauec.net/api/activities/';



  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.authBaseUrl + 'signin' , loginPayload);
  }

  getRoles() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.roleBaseUrl);
  }

  getRoleById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.roleBaseUrl + id);
  }


  createRole(role: Role) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.roleBaseUrl, role);
  }

  updateRole(role: Role) : Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.roleBaseUrl + role.id, role);
  }

  deleteRole(id: number) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.roleBaseUrl + id);
  }

  getRules() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ruleBaseUrl);
  }

  getRuleById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ruleBaseUrl + id);
  }


  createRule(rule: Rule) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.ruleBaseUrl, rule);
  }

  updateRule(rule: Rule) : Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.ruleBaseUrl + rule.id, rule);
  }

  deleteRule(id: number) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.ruleBaseUrl + id);
  }

  getActions() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.actionBaseUrl);
  }

  getActionById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.actionBaseUrl + id);
  }


  createAction(action: Action) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.actionBaseUrl, action);
  }

  updateAction(action: Action) : Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.actionBaseUrl + action.id, action);
  }

  deleteAction(id: number) : Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.ruleBaseUrl + id);
  }

  getActivities() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.activityBaseUrl);
  }

  getEvents() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.eventBaseUrl);
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.userBaseUrl);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.userBaseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.userBaseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.userBaseUrl + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.userBaseUrl + id);
  }
  
}

