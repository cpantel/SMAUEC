import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Action} from "../../model/action.model";
import { ApiService} from "../../service/api.service";


@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.css']
})

export class ListActionComponent implements OnInit {

  actions: Action[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getActions()
      .subscribe( data => {
        this.actions = data.result;
      });
  }

  deleteAction(action: Action): void {
    this.apiService.deleteAction(action.id)
      .subscribe( data => {
        this.actions = this.actions.filter(u => u !== action);
      })
  };

  editAction(action: Action): void {
    window.localStorage.removeItem("editActionId");
    window.localStorage.setItem("editActionId", action.id.toString());
    this.router.navigate(['edit-action']);
  };

  addAction(): void {
    this.router.navigate(['add-action']);
  };
}
