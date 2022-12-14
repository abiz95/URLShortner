import { Component, OnDestroy, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { commons } from '../app.constants';
import { LoadUrlService } from '../services/loadUrl/load-url.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit, OnDestroy {

  shortenLink
  linkService
  // actualLink
  appName: string = commons.appName
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadUrlService: LoadUrlService,
  ) {
    this.route.params.subscribe( params => {
      console.log("param",params)
      this.shortenLink=params;
    });
  }

  ngOnInit(): void {
    // window.location.href = "https://google.com/about";
    this.linkService = this.loadUrlService.getActualUrl(this.shortenLink.id).subscribe(
      (res)=>{
        console.log("shortenLink res: ",res)
        // this.actualLink=res
        window.location.href = res
      },
      (err) => {
        console.error('error caught in component',err.status)
        this.router.navigate(['error'])
      }
    );
  }

  ngOnDestroy(): void {
    if (this.linkService) {
      // console.log("unsubscribe")
        this.linkService.unsubscribe();
    }
  }

}
