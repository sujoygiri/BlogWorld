import { Component } from '@angular/core';
import {Router} from "@angular/router";

import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router, private globalService:GlobalService) { }
  readonly isAuthenticated = this.globalService.isAuthencicated
  loginClickHandler(){
    this.router.navigate(['/login'])
  }
}
