import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../service/api.service";

import { first } from "rxjs/operators";
import { Rule } from "../../model/rule.model";
import { Role } from "../../model/role.model";


@Component({
  selector: 'app-edit-rule',
  templateUrl: './edit-rule.component.html',
  styleUrls: ['./edit-rule.component.css']
})
export class EditRuleComponent implements OnInit {

  rule: Rule;
  roles: [Role];
  editForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let ruleId = window.localStorage.getItem("editRuleId");
    if(!ruleId) {
      alert("Invalid action.")
      this.router.navigate(['list-rule']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      topic: ['', Validators.required],
      description: [Validators.required],
      is_enabled: ['', Validators.required],
      activation_value: ['', Validators.required],
      duration: ['', Validators.required],
      action: ['', Validators.required]
    });
    this.apiService.getRuleById(+ruleId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

  onSubmit() {
    this.apiService.updateRule(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status === 200) {
            alert('Rule updated successfully.');
            this.router.navigate(['list-rule']);
          }else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        });
  }

}
