import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ItemService } from '../services/item/item.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProjectService } from '../services/project/project.service';

import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  itemForm: FormGroup;
  submitted: boolean = false;
  projectData: any;
  itemError: any;
  listGridView: string = "Grid";
  modalRef: any;
  itemList: any;
  getErrorMsg: any;
  updateItemData: any;
  updateRes: any;
  deleteItemData: any;
  deleteResponse: any;
  deleteErrorMsg: any;
  getProjectData: any;
  getProjectError: any;
  value: any;
  serachError: string;
  itemDetailsData: any;


  constructor(private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private itemService: ItemService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getItemList();
  }

  createForm() {
    this.itemForm = this.formBuilder.group({
      itemId: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      itemName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      itemQuantity: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      comments: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
      projectName: ['', Validators.required]
    })
  };

  getItemList() {
    this.itemService.getItem().subscribe((response) => {
      if (response) {
        this.itemList = response;
      } else {
        this.getErrorMsg = "No record found...";
      }
    }, (error) => {
      this.getErrorMsg = "No record found...";
    })
  }

  refreshItem() {
    this.submitted = false;
    this.getItemList();
  }

  gridListView(viewVale) {
    this.listGridView = viewVale;
  }

  openCreateItemModel(template: TemplateRef<any>) {
    this.createForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.submitted = false;
    this.getProject();
  }

  createItem() {
    console.log(this.itemForm.controls)
    this.submitted = false;
    if (this.itemForm.invalid) {
      this.submitted = true;
      return;
    } else {
      let itemPayload = {
        itemId: this.itemForm.controls.itemId.value,
        itemName: this.itemForm.controls.itemName.value,
        itemQuantity: this.itemForm.controls.itemQuantity.value,
        comments: this.itemForm.controls.comments.value,
        projectName: this.itemForm.controls.projectName.value.projectName ? this.itemForm.controls.projectName.value.projectName : this.itemForm.controls.projectName.value
      }
      if (itemPayload) {
        this.itemService.createItem(itemPayload).subscribe((response) => {
          this.projectData = response;
          this.closeModal();
          this.getItemList();
        }, ((error: string) => {
          this.itemError = error || 'Something went wrong, Please try agian';
        })
        )
      }
    }
  }

  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
    this.submitted = false;
  }

  editItemModal(itemData, template: TemplateRef<any>) {
    this.updateItemData = itemData
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    let dataesData = itemData;
    this.itemForm.patchValue(itemData);
    this.itemForm.controls['projectName'].setValue(dataesData.projectId.projectName);
    this.getProject();
  }

  updateItem() {
    this.submitted = false;
    this.itemError = "";
    if (this.itemForm.invalid) {
      this.submitted = true;
      return;
    } else {
      let updatePayload = this.itemForm.value;
      updatePayload._id = this.updateItemData._id;
      updatePayload.projectName = this.itemForm.value.projectName.projectName ? this.itemForm.value.projectName.projectName : this.itemForm.value.projectName;
      if (updatePayload) {
        this.itemService.updateItem(updatePayload).subscribe((response) => {
          this.updateRes = response;
          this.closeModal();
          this.getItemList();
        }, ((error) => {
          this.itemError = error.message || 'Something went wrong, Please try agian';
        })
        )
      }
    }
  }

  deleteItemModal(itemData, template) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteItemData = itemData;
  }

  deleteItem(itemData) {
    if (itemData._id) {
      this.itemService.deleteItem(itemData._id).subscribe(response => {
        this.deleteResponse = response;
        this.getItemList();
        this.modalRef.hide();
        this.modalRef = null;
      }, (error) => {
        this.deleteErrorMsg = error;
      })
    }
  }

  itemInfoModal(itemData, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.itemDetailsData = itemData;
  }

  getProject() {
    this.projectService.getProjects().subscribe((response) => {
      if (response && response.length) {
        this.getProjectData = response;
        this.itemForm.controls['projectName'].setValue(response[0].projectName);
      }
    }, (error) => {
      this.getProjectError = error || 'Project not found';
    })
  }

  searchProject(data) {
    console.log(data);
    if (data.term) {
      this.projectService.searchProjectByName(data.term).subscribe((response) => {
        if (response) {
          this.getProjectData = response;
        } else {
          this.serachError = "No record found";
        }
      }, (error) => {
        this.serachError = error ? error.message : "No record found";;
      })
    }
  }
}