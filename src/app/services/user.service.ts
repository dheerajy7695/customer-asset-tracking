import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError, BehaviorSubject, Observable } from 'rxjs';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // baseUrl: string = 'http://localhost:4000/api/';
  baseUrl: string = 'https://dheeraj-nodejs-app.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  genderArr = [{ id: 101, name: "Male" }, { id: 102, name: "Female" }, { id: 103, name: "Other" }];
  selectGender = new BehaviorSubject(this.genderArr);
  selectedGenderItems = this.selectGender.asObservable();

  securityArr = [{ id: 102, name: "What is your Birthdate?" }, { id: 103, name: "What is Your old Phone Number?" }, { id: 104, name: "What is your Pet Name?" }]
  securityQutns = new BehaviorSubject(this.securityArr);
  securityQustnArr = this.securityQutns.asObservable();


  login(reqPayload) {
    return this.http.post(`${this.baseUrl}loginUser`, reqPayload).pipe(catchError(this.handleError));
  }

  // getUsers() {
  //   return this.http.get(`${this.baseUrl}getUser`);
  // }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getUser`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getById/` + id);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getByUsername/` + username);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getUserByEmail/` + email);
  }

  createUser(createUserPayload) {
    return this.http.post(`${this.baseUrl}create-user`, createUserPayload).pipe(catchError(this.handleError));
  }

  updateUser(updatePayload): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}update/${updatePayload._id}`, updatePayload);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}delete-user/` + id);
  }

  getUserCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/getCount`);
  }

  handleError(error: HttpErrorResponse) {
    console.log("Getting error", error);
    return throwError(error);
  }


}
