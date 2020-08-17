import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Event} from "../../model/event.model";
import { ApiService} from "../../service/api.service";


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})

export class ListEventComponent implements OnInit {

  events: Event[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getEvents()
      .subscribe( data => {
        this.events = data.result;
      });
  }
}
