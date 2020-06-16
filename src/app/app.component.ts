import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showHideHeader: boolean = false;

  constructor(private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/' || event['url'] == '') {
          this.showHideHeader = false;
        } else {
          this.showHideHeader = true;
        }
      }
    })

  }

  ngOnInit(): void {

  }

}
