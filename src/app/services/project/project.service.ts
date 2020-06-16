import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // baseUrl: string = 'http://localhost:4000/api/project/';
  baseUrl: string = 'https://dheeraj-nodejs-app.herokuapp.com/api/project/';


  constructor(private http: HttpClient) { }


  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get`).pipe(catchError(this.handleError));
  }

  saveProject(userPayload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}save`, userPayload).pipe(catchError(this.handleError));
  }

  updateProject(updatePayload): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}update/${updatePayload._id}`, updatePayload);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}delete/` + id).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getById/` + id).pipe(catchError(this.handleError));
  }

  searchProjectByName(projectName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}serach/` + projectName).pipe(catchError(this.handleError));
  }

  getProjectCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getCount`);
  }

  handleError(error: HttpErrorResponse) {
    console.log("Getting error", error);
    return throwError(error);
  }

}
