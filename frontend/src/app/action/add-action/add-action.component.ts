import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      topic: ['', Validators.required],
      min_activation: ['', Validators.required],
      activation_value: ['', Validators.required],
      cancellation_value: ['', Validators.required]
    });
  }

  onSubmit() {
    this.apiService.createAction(this.addForm.value)
      .subscribe( data => {
        this.router.navigate(['list-action']);
      });
  }

}
