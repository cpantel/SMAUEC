import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Activity} from "../../model/activity.model";
import { ApiService} from "../../service/api.service";


@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})

export class ListActivityComponent implements OnInit {

  activities: Activity[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getActivities()
      .subscribe( data => {
        this.activities = data.result;
      });
  }
}
