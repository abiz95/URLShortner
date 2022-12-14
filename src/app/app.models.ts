import { BehaviorSubject } from "rxjs";

export class LocalDataModel {
    profileBasicInfo = new BehaviorSubject<any[]>([]);
    manageURLData = new BehaviorSubject<any[]>([]);
    issueHistoryData = new BehaviorSubject<any[]>([]);
    IssueListData = new BehaviorSubject<any[]>([]);
    profileInfo = new BehaviorSubject<any[]>([]);
    // profilePicture = new BehaviorSubject<any[]>([]);
}

export class auth {
    username: any;
    password: any;
}