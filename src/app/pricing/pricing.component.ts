import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSharedService } from '../services/authShared/auth-shared.service';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  plan: any;
  plainDetails: any;
  constructor(private sharedService: SharedService, private authSharedService: AuthSharedService, private router: Router) { }

  ngOnInit(): void {
  }

  updatePlan(plan: string) {
    // let loggedInUser = sessionStorage.getItem('userId');
    let loggedInUser = this.authSharedService.getSessionUserId();
    this.plainDetails = { userId: loggedInUser, plan: plan, planStatus: 1 };
    this.plan = this.sharedService.updateUserPlan(this.plainDetails).subscribe((res)=>{
      this.router.navigate(['admin'])
    },
    (err) => {
      console.error("err: ", err);
      this.router.navigate(['error'])
    }
    );
  }

  ngOnDestroy(): void {
  
    if (this.plan) {
      // console.log("unsubscribe")
        this.plan.unsubscribe();
    }
  }

}
