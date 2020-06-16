import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(user) {
    if (user.username) {
      localStorage.setItem('currentUser', user.username);
    }
  }

  getToken() {
    return localStorage.getItem("currentUser");
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("currentUser");
    return true;
  }
}
