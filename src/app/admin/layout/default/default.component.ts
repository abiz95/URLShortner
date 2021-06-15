import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isSideBarOpen = false;
  
  constructor() { }

  ngOnInit() {
  }

  isSideBarToggled(event: any) {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

}
