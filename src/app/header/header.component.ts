import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../authGuard/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  userError: string;

  constructor(private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getLoginUser();
  }

  getLoginUser() {
    let username = localStorage.getItem('currentUser');

    this.userService.getUserByUsername(username).subscribe((respone) => {
      if (respone) {
        this.userDetails = respone;
      } else {
        this.userError = "User not found";
      }
    }, (error) => {
      this.userError = error.message ? error.message : "User not found";
    })
  }

  signOut() {
    this.authService.logout();
    window.location.reload();
  }

}
