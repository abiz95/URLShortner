import { Component, OnInit } from '@angular/core';
import { commons } from 'src/app/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  appName: string = commons.appName
  constructor() { }

  ngOnInit() {
  }

}
