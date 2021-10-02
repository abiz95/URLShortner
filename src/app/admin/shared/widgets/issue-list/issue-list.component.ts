import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportIssueService } from 'src/app/admin/service/reportIssue/report-issue.service';
import { LocalDataModel } from 'src/app/app.models';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { LocalDataService } from 'src/app/services/localDataService/local-data.service';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';
import { EditIssueComponent } from '../edit-issue/edit-issue.component';
import { ViewIssueComponent } from '../view-issue/view-issue.component';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit, OnDestroy {

  issueListData: any;
  deleteIssueData: any;
  noDataMsg: boolean = false;
  issueList: any;
  updateIssueListData: any;
  private store = new LocalDataModel();

  constructor(
    private reportIssueService: ReportIssueService, 
    private adminAuthService: AuthSharedService,
    private localDataService: LocalDataService,
    private matDialog: MatDialog,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['issueId', 'issueTitle', 'cre_rec_ts', 'issueStatus', 'delete', 'edit', 'view'];
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
    this.getIssueListData();
  }


  getIssueListData() {
    // this.issueListData = this.reportIssueService.getIssueList(this.adminAuthService.getSessionUserId()).subscribe(
    //   (res)=>{
    //     console.log("getIssueListData: "+res);
    //     this.issueList = res;
    //     if (this.issueList !== null) {
    //       this.listData = new MatTableDataSource(this.issueList);
    //       this.listData.sort = this.sort;
    //       this.listData.paginator = this.paginator;
    //     } else {
    //       this.noDataMsg = true;
    //     }
    //   }
    // );

    this.issueListData = this.store.IssueListData.subscribe((data) => {
      console.log("getIssueListData: "+data);
      this.issueList = data;
      if (this.issueList !== null) {
        this.listData = new MatTableDataSource(this.issueList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      } else {
        this.noDataMsg = true;
      }
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  editIssueDetails(obj: any) {
    console.log("updateUrlDetails: "+JSON.stringify(obj));

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = obj;
    dialogConfig.width="500px";
    dialogConfig.height='auto';
    
    let urlRef = this.matDialog.open(EditIssueComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        this.getIssueListData();
      }
    );
  }

  deleteIssue(issueId: any) {
    console.log("issueId: "+issueId);

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
          this.deleteIssueData = this.reportIssueService.updateIssueStatus(issueId).subscribe(
            (res)=>{
              console.log("deleteIssue: "+res);
              this.updateIssueListDataService();
            }
          );
        }
      }
    );

  }

  updateIssueListDataService() {
    this.updateIssueListData = this.reportIssueService.getIssueList(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        // console.log("updateIssueListDataService: "+res);
        let issueList: any = res;
        this.localDataService.setIssueListData(issueList);
        this.getIssueListData();
      }
    );
  }

  viewIssueDetails(obj: any) {

    console.log("obj: "+obj);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = obj;
    dialogConfig.width="500px";
    dialogConfig.height='auto';

    let urlRef = this.matDialog.open(ViewIssueComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        console.log("Dialog output:", data)
        // this.getPremiumUrlListData();
        if (data === "true") {
          // this.deleteIssueData = this.reportIssueService.updateIssueStatus(issueId).subscribe(
          //   (res)=>{
          //     console.log("deleteIssue: "+res);
          //     this.getIssueListData();
          //   }
          // );
        }
      }
    );
  }

  ngOnDestroy(): void {
  
    if (this.issueListData) {
      // console.log("unsubscribe")
        this.issueListData.unsubscribe();
    }
    if (this.updateIssueListData) {
      // console.log("unsubscribe")
        this.updateIssueListData.unsubscribe();
    }
    if (this.deleteIssueData) {
      // console.log("unsubscribe")
        this.deleteIssueData.unsubscribe();
    }

  }

}
