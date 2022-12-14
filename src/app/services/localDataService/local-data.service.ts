import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalDataModel } from 'src/app/app.models';

@Injectable()
export class LocalDataService {

  private localData =  new BehaviorSubject<LocalDataModel>(
    new LocalDataModel()
  );

  public getLocalData(): Observable<LocalDataModel> {
    return this.localData.asObservable();
  }

  public setProfileBasicInfo(data: any[]): void {
    this.localData.value.profileBasicInfo.next(data);
  }

  public setManageURLData(data: any[]): void {
    this.localData.value.manageURLData.next(data);
  }

  public setIssueHistoryData(data: any[]): void {
    this.localData.value.issueHistoryData.next(data);
  }

  public setIssueListData(data: any[]): void {
    this.localData.value.IssueListData.next(data);
  }

  public setProfileInfo(data: any[]): void {
    this.localData.value.profileInfo.next(data);
  }

  // public setProfilePicture(data: any[]): void {
  //   this.localData.value.profilePicture.next(data);
  // }
}
