import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {AuthService} from "../../services/auth/auth.service";
import {LoginDataModel} from "../../models/user/login-data.model";
import {ResponseDataModel} from "../../models/response-data.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isErrorOccurred: boolean = false;
  errorMessage: string = '';
  showSpinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
        ]
      ]
    });
  }
  onSubmit(): void {
    this.showSpinner = true;
    let isFormValid: boolean = this.loginForm.valid;
    if (isFormValid) {
      let userData:LoginDataModel = this.loginForm.value;
      this.authService.onLoginHandler(userData).subscribe({
        next: (data:ResponseDataModel) => {
          if(data){
            let userName = data.userName
            localStorage.setItem('userName',userName)
            this.showSpinner = false
          }
        },
        error: (err) => {
          this.isErrorOccurred = true
          this.errorMessage = err.message.message
        },
        complete: () => {
          this.router.navigate(['/'])
        }
      })
    } else {
      this.isErrorOccurred = true;
      this.errorMessage = 'Invalid user data';
    }
  }
}
