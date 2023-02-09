import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth/auth.service";
import {RegistrationDataModel} from "../../models/user/registration-data.model";
import {ResponseDataModel} from "../../models/response-data.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  isErrorOccurred: boolean = false;
  errorMessage: string = '';
  showSpinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ],
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
    let isFormValid: boolean = this.registrationForm.valid;
    if (isFormValid) {
      let userData: RegistrationDataModel = this.registrationForm.value;
      this.authService.onRegisterHandler(userData).subscribe({
        next: (data:ResponseDataModel) => {
          if (data) {
            let userName = data.userName
            localStorage.setItem('userName', userName)
            this.showSpinner = false
          }
        },
        error: (error) => {
          this.isErrorOccurred = true
          this.errorMessage = error.message.message
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
