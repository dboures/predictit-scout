import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonitorService } from '@app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewValue = 44;
  constructor(private router: Router, private monitorService: MonitorService) { }

  ngOnInit() {
  }

  //TODO: load this persons alerts from the database here

  monitor() {
    this.monitorService.monitor().subscribe(
      data => { 
        console.log(data)
        this.viewValue = data },
      error => { 
        console.log(error);
      }
    );
  }

}
