import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../service/api.service";

import { first } from "rxjs/operators";
import { Action } from "../../model/action.model";
import { Role } from "../../model/role.model";


@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.css']
})
export class EditActionComponent implements OnInit {

  action: Action;
  editForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let actionId = window.localStorage.getItem("editActionId");
    if(!actionId) {
      alert("Invalid action.")
      this.router.navigate(['list-action']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      actionname: ['', Validators.required],
      email: ['', Validators.required],
      roles: [null, Validators.required]
    });
    this.apiService.getActionById(+actionId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

  onSubmit() {
    this.apiService.updateAction(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('Action updated successfully.');
            this.router.navigate(['list-action']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
