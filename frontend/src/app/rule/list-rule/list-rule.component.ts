import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Rule} from "../../model/rule.model";
import { ApiService} from "../../service/api.service";


@Component({
  selector: 'app-list-rule',
  templateUrl: './list-rule.component.html',
  styleUrls: ['./list-rule.component.css']
})

export class ListRuleComponent implements OnInit {

  rules: Rule[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getRules()
      .subscribe( data => {
        this.rules = data.result;
      });
  }

  deleteRule(rule: Rule): void {
    this.apiService.deleteRule(rule.id)
      .subscribe( data => {
        this.rules = this.rules.filter(u => u !== rule);
      })
  };

  editRule(rule: Rule): void {
    window.localStorage.removeItem("editRuleId");
    window.localStorage.setItem("editRuleId", rule.id.toString());
    this.router.navigate(['edit-rule']);
  };

  addRule(): void {
    this.router.navigate(['add-rule']);
  };
}
