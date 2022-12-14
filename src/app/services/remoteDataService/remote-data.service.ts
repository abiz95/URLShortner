import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoteDataService {

  constructor(private http: HttpClient) { }

  // private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  /* GET data that contains search term */
  public getData(url: string): Observable<any> { 
    return this.http.get<any>(url).pipe(
      tap((x) => 
      x?.length 
      ? this.log('Found data matching entries') 
      : this.log('No data found')), 
      catchError(this.handleError('searchData', []))
    ); 
  }

  //////// Save methods ////////// 
  /** POST: add data to the server */ 
  public postData(data: any, url: string): Observable<any> { 
    return this.http.post(url, data, {responseType: 'text'}).pipe( 
      tap((newData: any) => this.log(`Added data with id=${newData.id}`)), 
      catchError(this.handleError('addData')) 
    );
  }

  /** DELETE: delete data from the server */ 
  public deleteData( 
    userId: any, 
    url: string 
    ): Observable<any> { 
      // const id = typeof data === 'number' ? data : data.id; 
      url = `${url}/${userId}`; 
      return this.http.delete(url, {responseType: 'text'}).pipe( 
        tap((_) => this.log(`Deleted data id=${userId}`)), 
        catchError(this.handleError('deleteData')) 
      ); 
    }

  /** PUT: update data on the server */ 
  public putData(data: any, url: string): Observable<any> { 
    return this.http.put(url, data, {responseType: 'text'}).pipe( 
      tap((_) => this.log(`Updated data id= ${data.id}`)), 
      catchError(this.handleError<any>('updateData')) 
    ); 
  }

  private handleError<T>(operation = 'operation', result?: T): any { 
    return (error: any): Observable<T> => { 
      // TODO: send the error to remote logging infrastructure 
      console.error(error); // log to console instead 
      // TODO: better job of transforming error for user consumption 
      this.log(`${operation} failed: ${error.message}`); 
      // Let the app keep running by returning an empty result. 
      return of(result as T); 
    }; 
  }

  private log(message: string): void { 
    console.log('DataService : ', `${message}`); 
   }
  
}
