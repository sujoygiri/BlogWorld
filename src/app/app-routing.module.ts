import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {BlogEditorComponent} from "./components/blog-editor/blog-editor.component";
import {AuthGuard} from "./services/auth/auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate:[AuthGuard] },
  {path:'new-blog',component:BlogEditorComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
