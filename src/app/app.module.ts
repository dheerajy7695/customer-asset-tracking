import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SerachComponent } from './serach/serach.component';
import { ItemComponent } from './item/item.component';

import { NgSelectModule } from '@ng-select/ng-select';

import { AuthService } from './authGuard/auth.service';
import { AuthGuard } from './authGuard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    ProjectComponent,
    UserComponent,
    SerachComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgSelectModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
