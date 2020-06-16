import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { from } from 'rxjs';
import { AuthService } from '../authGuard/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  addUserForm: FormGroup;
  updatePwdForm: FormGroup;
  resetForm: FormGroup;
  invalidLogin: boolean = false;
  invalidLoginError: any;
  userData: any;
  securityQuestion: { id: number; name: string; }[];
  submitted: boolean = false;
  userFormData: Object;
  genderData: { id: number; name: string; }[];
  getUserError: any;
  formView: string;
  wrongEmail: string;
  navigateOnUpdatePWD: boolean = false;
  emailSubmit: boolean;
  passHide: boolean = true;
  cofmPassHide: boolean = true;
  updatePwdUserData: any;
  updateError: string;
  updatedUser: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private routerModule: RouterModule,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showHideRegisterForm('Login');
    this.createLoginForm();
    this.createUserForm();
    this.dropDownData();
  }

  get f() { return this.addUserForm.controls; }

  dropDownData() {
    this.userService.securityQustnArr.subscribe((data) => {
      this.securityQuestion = data;
    });

    this.userService.selectGender.subscribe((response) => {
      this.genderData = response;
    })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    })
  }

  showHideRegisterForm(value: string) {
    this.formView = value;
    this.submitted = false;
    if (value === 'Reset') {
      this.createRestForm();
    }
  };

  createUserForm() {
    this.addUserForm = this.formBuilder.group({
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
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.invalidLogin = true;
      return;
    }
    this.invalidLogin = false;

    let loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    this.userService.login(loginPayload).subscribe((response) => {
      if (response) {
        this.userData = response;
        this.authService.setToken(response);
        this.router.navigate(['/home']);
      }
    }, (error) => {
      this.invalidLoginError = error.error ? error.error.message : "Wrong password!";
      this.invalidLogin = true;
    });
  };

  registerUserClick() {
    if (this.getUserError) this.getUserError = '';
    if (this.addUserForm.invalid) {
      this.submitted = true;
      return;
    } else {
      const createUserPayload = {
        username: this.addUserForm.controls.username.value,
        password: this.addUserForm.controls.password.value,
        confirmPassword: this.addUserForm.controls.confirmPassword.value,
        email: this.addUserForm.controls.email.value,
        firstName: this.addUserForm.controls.firstName.value,
        lastName: this.addUserForm.controls.lastName.value,
        phone: this.addUserForm.controls.phone.value,
        securityKey: this.addUserForm.controls.securityKey.value,
        securityValue: this.addUserForm.controls.securityValue.value,
        gender: this.addUserForm.controls.gender.value
      };

      console.log('createUserPayload-->', createUserPayload);
      this.userService.createUser(createUserPayload).subscribe((response) => {
        this.userData = response;
        alert('User created successfully');
        window.location.reload();
      }, (error) => {
        this.getUserError = error.error;
      })
      this.submitted = false;
    }
  };

  createRestForm() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  };

  resetPwdNext() {
    this.emailSubmit = false;
    if (!this.resetForm.invalid) {
      let userEmail = this.resetForm.controls.email.value;
      this.userService.getUserByEmail(userEmail).subscribe((user) => {
        if (user) {
          this.updatePwdUserData = user;
          this.formView = 'UpdatePWDView';
          this.createUpdatePWDForm();

          this.passHide = true;
          this.cofmPassHide = true;
        } else {
          this.wrongEmail = 'User not found!';
        }
      }, (error) => {
        this.wrongEmail = 'User not found!';
      })
    } else {
      this.emailSubmit = true;
    }
  };

  showHideCnfmPwd() {
    if (this.cofmPassHide) {
      this.cofmPassHide = false;
    } else {
      this.cofmPassHide = true;
    }
  };

  showHidePwd() {
    if (this.passHide) {
      this.passHide = false;
    } else {
      this.passHide = true;
    }
  }

  createUpdatePWDForm() {
    this.updatePwdForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      confirm_password: ['', [Validators.required]]
    }, { validator: this.confirmedValidator('password', 'confirm_password') })
  };

  get pwd() { return this.updatePwdForm.controls; }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  updatePwd() {
    this.emailSubmit = false;
    if (!this.updatePwdForm.invalid) {

      this.updatePwdUserData["password"] = this.updatePwdForm.controls.password.value;
      this.userService.updateUser(this.updatePwdUserData).subscribe((user) => {
        if (user) {
          this.updatedUser = user;
          this.formView = 'Login';
        } else {
          this.updateError = 'User not found!';
        }
      }, (error) => {
        this.updateError = 'User not found!';
      })
    } else {
      this.emailSubmit = true;
    }
  }

}