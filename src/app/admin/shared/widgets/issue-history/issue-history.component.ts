import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAuthService } from 'src/app/admin/service/adminAuth/admin-auth.service';
import { ReportIssueService } from 'src/app/admin/service/reportIssue/report-issue.service';
import { ViewIssueComponent } from '../view-issue/view-issue.component';

@Component({
  selector: 'app-issue-history',
  templateUrl: './issue-history.component.html',
  styleUrls: ['./issue-history.component.scss']
})
export class IssueHistoryComponent implements OnInit {

  issueListData: any;
  deleteIssueData: any;

  issueList: any;

  constructor(
    private reportIssueService: ReportIssueService, 
    private adminAuthService: AdminAuthService,
    private matDialog: MatDialog,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['issueId', 'issueTitle', 'cre_rec_ts', 'issueStatus', 'view'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  
  ngOnInit() {

    this.getIssueHistoryData();
  }


  getIssueHistoryData() {
    this.issueListData = this.reportIssueService.getIssueHistory(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("getIssueListData: "+res);
        this.issueList = res;
        this.listData = new MatTableDataSource(this.issueList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
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
