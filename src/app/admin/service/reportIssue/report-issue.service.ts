import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportIssueService {

  constructor(private http: HttpClient) { }

  saveIssueDetails(obj:any) {
    console.log("saveIssueDetails: "+obj)
    return this.http.post('http://localhost:8080/report/save', obj, {responseType: 'text'});
  }

  getIssueDetails(UserId:any) {
    console.log("getIssueDetails::user: "+UserId)
    return this.http.get('http://localhost:8080/report/issue/'+UserId);
  }

  getIssueList(UserId:any) {
    console.log("getIssueList::user: "+UserId)
    return this.http.get('http://localhost:8080/report/all/'+UserId);
  }

  getIssueHistory(UserId:any) {
    console.log("getIssueHistory::user: "+UserId)
    return this.http.get('http://localhost:8080/report/History/'+UserId);
  }

  updateIssueDetails(obj:any) {
    console.log("saveUserInfo: "+JSON.stringify(obj));
    return this.http.put('http://localhost:8080/issue/update', obj, {responseType: 'text'});
  }

  updateIssueStatus(issueId:any) {
    console.log("getIssueList::issueId: "+issueId)
    return this.http.get('http://localhost:8080/issue/resolved/'+issueId);
  }
}
