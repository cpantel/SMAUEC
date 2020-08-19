import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Role} from "../../model/role.model";
import { ApiService} from "../../service/api.service";


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})

export class ListRoleComponent implements OnInit {

  roles: Role[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getRoles()
      .subscribe( data => {
        this.roles = data.result;
      });
  }

  deleteRole(role: Role): void {
    this.apiService.deleteRole(role.id)
      .subscribe( data => {
        this.roles = this.roles.filter(u => u !== role);
      })
  };

  editRole(role: Role): void {
    window.localStorage.removeItem("editRoleId");
    window.localStorage.setItem("editRoleId", role.id.toString());
    this.router.navigate(['edit-role']);
  };

  addRole(): void {
    this.router.navigate(['add-role']);
  };
}
