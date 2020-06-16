import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project/project.service';
import { ItemService } from '../services/item/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  onselectValue: any;
  userRecord: any;
  projectError: string;
  projectRecords: any;
  userError: string;
  userCount: any;
  projectCount: any;
  itemCount: any;
  itemRecords: any;
  itemError: string;

  constructor(private userService: UserService,
    private projectService: ProjectService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getProjects();
    this.getItems();
    this.getProjectCount();
    this.getItemCount();
    this.getUserCount();
  }

  getUserCount() {
    this.userService.getUserCount().subscribe((countRes) => {
      this.userCount = countRes;
    })
  }

  getItemCount() {
    this.itemService.getItemCount().subscribe((countRes) => {
      this.itemCount = countRes;
    })
  }

  getProjectCount() {
    this.projectService.getProjectCount().subscribe((countRes) => {
      this.projectCount = countRes;
    })
  }

  getProjects() {
    this.projectService.getProjects().subscribe((response) => {
      if (response.length) {
        this.projectRecords = response;
      } else {
        this.projectError = "No record found";
      }
    }, (error) => {
      this.projectError = error.message ? error.message : "No record found";
    })
  }

  getUser() {
    this.userService.getUsers().subscribe((response) => {
      if (response) {
        this.userRecord = response;
      } else {
        this.userError = "No record found";
      }
    }, (error) => {
      this.userError = error.message ? error.message : "No record found";
    })
  }

  getItems() {
    this.itemService.getItem().subscribe((response) => {
      if (response) {
        this.itemRecords = response;
      } else {
        this.itemError = "No record found";
      }
    }, (error) => {
      this.itemError = error.message ? error.message : "No record found";
    })
  }

}
