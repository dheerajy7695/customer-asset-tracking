import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { ItemService } from '../services/item/item.service';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrls: ['./serach.component.css']
})
export class SerachComponent implements OnInit {
  values: string;
  projectSearchText: string;
  itemSearchText: string;
  projectList = [];
  errorMsg: string;
  loadingBar: boolean = false;
  itemList = [];

  constructor(private projectService: ProjectService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
  }

  onProjectSearchEvent(value: string) {
    if (value.length) {
      this.loadingBar = true;
      if (this.projectList.length) this.projectList = [];
      if (this.itemList.length) this.itemList = [];
      this.projectService.searchProjectByName(value).subscribe((response) => {
        if (response.length) {
          this.errorMsg = '';
          this.projectList = response;
        } else {
          this.errorMsg = "No record found...";
        }
        this.loadingBar = false;
      }, (error) => {
        this.errorMsg = error.error ? error.error.message : 'No record found...';
        this.loadingBar = false;
      })
    }
  }

  onItemSearchEvent(value: string) {
    if (value.length) {
      this.loadingBar = true;
      if (this.projectList.length) this.projectList = [];
      if (this.itemList.length) this.itemList = [];
      this.itemService.searchItemByName(value).subscribe((response) => {
        if (response.length) {
          this.errorMsg = '';
          this.itemList = response;
        } else {
          this.errorMsg = "No record found...";
        }
        this.loadingBar = false;
      }, (error) => {
        this.errorMsg = error.error ? error.error.message : 'No record found...';
        this.loadingBar = false;
      })
    }
  }

  refresh() {
    this.projectSearchText = '';
    this.itemSearchText = '';
    this.errorMsg = '';
    if (this.projectList.length) this.projectList = [];
    if (this.itemList.length) this.itemList = [];
  }
}
