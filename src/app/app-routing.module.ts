import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { from } from 'rxjs';
import { SerachComponent } from './serach/serach.component';
import { ItemComponent } from './item/item.component';
import { AuthGuard } from './authGuard/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "header",
    component: HeaderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "project",
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "search",
    component: SerachComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "item",
    component: ItemComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
