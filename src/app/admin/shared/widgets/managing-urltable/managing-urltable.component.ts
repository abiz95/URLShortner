import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PremiumUrlService } from 'src/app/admin/service/premiumUrl/premium-url.service';
import { LocalDataModel } from 'src/app/app.models';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { LocalDataService } from 'src/app/services/localDataService/local-data.service';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';
import { EditUrlComponent } from '../edit-url/edit-url.component';


@Component({
  selector: 'app-managing-urltable',
  templateUrl: './managing-urltable.component.html',
  styleUrls: ['./managing-urltable.component.scss']
})
export class ManagingURLTableComponent implements OnInit {

  premiumUrlListData: any;
  deletePremiumUrlData: any;
  noDataMsg: boolean = false;
  premiumUrlList: any;
  updatePremiumUrlListData: any;
  private store = new LocalDataModel();

  constructor(
    private premiumUrlService: PremiumUrlService, 
    private adminAuthService: AuthSharedService,
    private localDataService: LocalDataService,
    private matDialog: MatDialog,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['actualUrl', 'shortenUrl', 'cre_rec_ts', 'urlStatus', 'delete', 'updateStatus', 'edit'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  ngOnInit() {
    this.localDataService.getLocalData().subscribe(
      (update) => {
        this.store = update;
        // console.log('localDataService: ', update);
      }
    );
    this.getPremiumUrlListData();
  }


  getPremiumUrlListData() {
    // this.premiumUrlListData = this.premiumUrlService.getPremiumUrlList(this.adminAuthService.getSessionUserId()).subscribe(
    //   (res)=>{
    //     console.log("premiumUrlList: "+res);
    //     this.premiumUrlList = res;
    //     if (this.premiumUrlList !== null) {
    //       this.listData = new MatTableDataSource(this.premiumUrlList);
    //       this.listData.sort = this.sort;
    //       this.listData.paginator = this.paginator;
    //     } else {
    //       this.noDataMsg = true;
    //     }
    //   }
    // );

    this.premiumUrlListData = this.store.manageURLData.subscribe((data) => {
      this.premiumUrlList = data;
        if (this.premiumUrlList !== null) {
          this.listData = new MatTableDataSource(this.premiumUrlList);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        } else {
          this.noDataMsg = true;
        }
      }
    );

  }

  updateManageUrlDataService() {
    this.updatePremiumUrlListData = this.premiumUrlService.getPremiumUrlList(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("premiumUrlList: "+res);
        let premiumUrlList: any = res;
        this.localDataService.setManageURLData(premiumUrlList);
        this.getPremiumUrlListData();
      }
    );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  updateUrlDetails(obj: any) {
    console.log("updateUrlDetails: "+JSON.stringify(obj));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = obj;
    dialogConfig.width="500px";
    dialogConfig.height='auto';
    
    let urlRef = this.matDialog.open(EditUrlComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        this.updateManageUrlDataService();
      }
    );
  }

  deleteUrl(shortenUrl: any) {
    console.log("shortenUrl: "+shortenUrl);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = shortenUrl;
    // dialogConfig.width="500px";
    // dialogConfig.height="400px";

    let urlRef = this.matDialog.open(DeleteMessageComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        // this.getPremiumUrlListData();
        if (data === "true") {
          this.deletePremiumUrlData = this.premiumUrlService.deletePremiumUrlDetails(this.adminAuthService.getSessionUserId(), shortenUrl).subscribe(
            (res)=>{
              console.log("deleteUrlStatus: "+res);
              this.updateManageUrlDataService();
            }
          );
        }
      }
    );


  }

  updateUrlStatus(obj: any) {
    console.log("updateUrlStatus: "+JSON.stringify(obj));
    let statusInd: number
    if (obj.urlStatus === 1) {
      statusInd=0;
    }
    else if (obj.urlStatus === 0) {
      statusInd=1;
    }
    let data = { userId: this.adminAuthService.getSessionUserId(), shortenUrl: obj.shortenUrl, urlStatus: statusInd}
    this.deletePremiumUrlData = this.premiumUrlService.updateCustomPremiumUrlStatus(data).subscribe(
      (res)=>{
        console.log("updateUrlStatus: "+res);
        this.updateManageUrlDataService();
      }
    );
  }

  ngOnDestroy(): void {
  
    if (this.premiumUrlListData) {
      // console.log("unsubscribe")
        this.premiumUrlListData.unsubscribe();
    }
    if (this.updatePremiumUrlListData) {
      // console.log("unsubscribe")
        this.updatePremiumUrlListData.unsubscribe();
    }
    if (this.deletePremiumUrlData) {
      // console.log("unsubscribe")
        this.deletePremiumUrlData.unsubscribe();
    }

  }

}

