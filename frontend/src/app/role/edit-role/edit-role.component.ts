import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../service/api.service";

import { first } from "rxjs/operators";
import { Role } from "../../model/role.model";


@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  role: Role;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let roleId = window.localStorage.getItem("editRoleId");
    if(!roleId) {
      alert("Invalid action.")
      this.router.navigate(['list-role']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    });
    this.apiService.getRoleById(+roleId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

  onSubmit() {
    this.apiService.updateRole(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('Role updated successfully.');
            this.router.navigate(['list-role']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
