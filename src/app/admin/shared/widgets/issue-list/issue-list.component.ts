import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportIssueService } from 'src/app/admin/service/reportIssue/report-issue.service';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';
import { EditIssueComponent } from '../edit-issue/edit-issue.component';
import { ViewIssueComponent } from '../view-issue/view-issue.component';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  issueListData: any;
  deleteIssueData: any;
  noDataMsg: boolean = false;
  issueList: any;

  constructor(
    private reportIssueService: ReportIssueService, 
    private adminAuthService: AuthSharedService,
    private matDialog: MatDialog,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['issueId', 'issueTitle', 'cre_rec_ts', 'issueStatus', 'delete', 'edit', 'view'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  ngOnInit() {

    this.getIssueListData();
  }


  getIssueListData() {
    this.issueListData = this.reportIssueService.getIssueList(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("getIssueListData: "+res);
        this.issueList = res;
        if (this.issueList !== null) {
          this.listData = new MatTableDataSource(this.issueList);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        } else {
          this.noDataMsg = true;
        }
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
              this.getIssueListData();
            }
          );
        }
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

}
