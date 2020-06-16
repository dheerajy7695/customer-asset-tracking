import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  // baseUrl: string = 'http://localhost:4000/api/item/';
  baseUrl: string = 'https://dheeraj-nodejs-app.herokuapp.com/api/item/';


  constructor(private http: HttpClient) { }

  getItem() {
    return this.http.get(`${this.baseUrl}get`);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getById/` + id);
  }

  createItem(itemPayload) {
    return this.http.post(`${this.baseUrl}save`, itemPayload).pipe(catchError(this.handleError));
  }

  updateItem(updatePayload): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}update/${updatePayload._id}`, updatePayload);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}delete/` + id);
  }

  searchItemByName(itemName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}serach/` + itemName).pipe(catchError(this.handleError));
  }
  
  getItemCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getCount`);
  }

  handleError(error: HttpErrorResponse) {
    console.log("Getting error", error);
    return throwError(error);
  }
}
