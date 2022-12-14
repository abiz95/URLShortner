import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from 'src/app/app.enums';
import { RemoteDataService } from 'src/app/services/remoteDataService/remote-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportIssueService {

  constructor(private remoteDataService: RemoteDataService) { }

  // const href = `${environment.apiUrl}${apiPath.premium}`+'/status';
  // return this.remoteDataService.putData(obj, href);
  // return this.remoteDataService.getData(href);

  saveIssueDetails(obj:any) {
    console.log("saveIssueDetails: "+obj)
    // return this.http.post('http://localhost:8080/report/save', obj, {responseType: 'text'});
    const href = `${environment.apiUrl}${apiPath.report}`+'/save';
    return this.remoteDataService.postData(obj, href);
  }

  getIssueDetails(UserId:any) {
    console.log("getIssueDetails::user: "+UserId)
    // return this.http.get('http://localhost:8080/report/issue/'+UserId);
    const href = `${environment.apiUrl}${apiPath.report}`+'/issue/'+UserId;
    return this.remoteDataService.getData(href);
  }

  getIssueList(UserId:any) {
    console.log("getIssueList::user: "+UserId)
    // return this.http.get('http://localhost:8080/report/all/'+UserId);
    const href = `${environment.apiUrl}${apiPath.report}`+'/all/'+UserId;
    return this.remoteDataService.getData(href);
  }

  getIssueHistory(UserId:any) {
    console.log("getIssueHistory::user: "+UserId)
    // return this.http.get('http://localhost:8080/report/History/'+UserId);
    const href = `${environment.apiUrl}${apiPath.report}`+'/History/'+UserId;
    return this.remoteDataService.getData(href);
  }

  updateIssueDetails(obj:any) {
    console.log("saveUserInfo: "+JSON.stringify(obj));
    // return this.http.put('http://localhost:8080/issue/update', obj, {responseType: 'text'});
    const href = `${environment.apiUrl}${apiPath.issue}`+'/update';
    return this.remoteDataService.putData(obj, href);
  }

  updateIssueStatus(issueId:any) {
    console.log("getIssueList::issueId: "+issueId)
    // return this.http.get('http://localhost:8080/issue/resolved/'+issueId);
    const href = `${environment.apiUrl}${apiPath.issue}`+'/resolved/'+issueId;
    return this.remoteDataService.getData(href);
  }
}
