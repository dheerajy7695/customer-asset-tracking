import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { from } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: Object;
  userError: any;
  listGridView: string = "Grid";
  deleteUserData: any;
  deleteModel: boolean;
  deleteErrorMessage: string;
  modalRef: BsModalRef;

  userForm: FormGroup;
  securityQuestion: { id: number; name: string; }[];
  genderData: { id: number; name: string; }[];
  submitted: boolean = false;
  userData: Object;
  updateUserData: any;
  updateRes: any;
  userDetails: any;
  loginUser: any;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getUserList();
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')])],
      securityKey: ['', Validators.required],
      securityValue: ['', Validators.required],
      gender: ['', Validators.required]
    })

    this.userService.selectedGenderItems.subscribe((response) => {
      this.genderData = response;
    })

    this.userService.securityQustnArr.subscribe((response) => {
      this.securityQuestion = response;
    })
  }

  getUserList() {
    this.userService.getUsers().subscribe((userRespose) => {
      this.loginUser = localStorage.getItem("currentUser");
      // _.remove(userRespose, function (e) { return e.username == loginUser });

      this.userList = userRespose;
      console.log(userRespose);
    }, (error) => {
      this.userError = error;
    })
  }

  gridListView(viewVale) {
    this.listGridView = viewVale;
  }

  editUserModal(userData, template: TemplateRef<any>) {
    this.updateUserData = userData
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.userForm.patchValue(userData);
  }

  UpdateUser() {
    this.submitted = false;
    this.userError = "";
    if (this.userForm.invalid) {
      this.submitted = true;
      return
    } else {
      let updatePayload = this.userForm.value;
      updatePayload._id = this.updateUserData._id;
      if (updatePayload) {
        this.userService.updateUser(updatePayload).subscribe((response) => {
          this.updateRes = response;
          this.closeUserModal();
          this.getUserList();
        }, ((error) => {
          this.userError = error.message || 'Something went wrong, Please try agian';
        })
        )
      }
    }
  }

  openDeleteModel(userData, template) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteUserData = userData;
  }

  deleteUser(userData) {
    if (userData && userData.userId) {
      this.deleteErrorMessage = '';
      this.userService.deleteUser(userData.userId).subscribe((response) => {
        this.getUserList();
        this.modalRef.hide();
        this.modalRef = null;
      }, (error) => {
        this.deleteErrorMessage = error.error;
      });
    }
  }

  openCreateModal(template: TemplateRef<any>) {
    this.createUserForm();
    this.updateUserData = '';
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeUserModal() {
    this.modalRef.hide();
    this.modalRef = null;
    this.submitted = false;
  }

  createUser() {
    this.submitted = false;
    if (this.userForm.invalid) {
      this.submitted = true;
      return
    } else {
      let userPayload = {
        username: this.userForm.controls.username.value,
        password: this.userForm.controls.password.value,
        confirmPassword: this.userForm.controls.confirmPassword.value,
        email: this.userForm.controls.email.value,
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        phone: this.userForm.controls.phone.value,
        securityKey: this.userForm.controls.securityKey.value,
        securityValue: this.userForm.controls.securityValue.value,
        gender: this.userForm.controls.gender.value
      }

      if (userPayload) {
        this.userService.createUser(userPayload).subscribe((userResponse) => {
          if (userResponse) {
            this.userData = userResponse;
            alert('User created successfully');
            this.closeUserModal();
            this.getUserList();
            this.router.navigate(['user']);
          }
        }, ((error) => {
          this.userError = error || 'Something went wrong, Please try agian';
        })
        )
      }
    }
  }

  userInfoModal(userData, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.userDetails = userData;
  }

}
