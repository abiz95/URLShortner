import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize-url',
  templateUrl: './customize-url.component.html',
  styleUrls: ['./customize-url.component.scss']
})
export class CustomizeUrlComponent implements OnInit {

  QRvalue: any;
  QACodeInd: any = false;

  constructor() { }

  ngOnInit() {
  }

  QADetails(obj) {
    console.log("QA data from child: "+JSON.stringify(obj));
    console.log("ind: ",obj.ind);
    this.QACodeInd=obj.ind;
    this.QRvalue=obj.url;
  }

}
