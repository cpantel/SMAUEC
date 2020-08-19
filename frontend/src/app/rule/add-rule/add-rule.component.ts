import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.css']
})
export class AddRuleComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      topic: ['', Validators.required],
      description: [Validators.required],
      is_enabled: ['', Validators.required],
      activation_value: ['', Validators.required],
      duration: ['', Validators.required],
      action: ['', Validators.required]
    });
  }

  onSubmit() {
    this.apiService.createRule(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-rule']);
      });
  }

}
