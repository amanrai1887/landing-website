import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loginShow: boolean = true;
  signupShow: boolean = false;
  activeForm: 'login' | 'signup' = 'login';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginSuccessMessage: string = '';
  signupSuccessMessage: string = '';
  loginErrorMessage: string = '';
  signupErrorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[789][0-9]{9}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    // Send login request
    this.http.post('http://localhost:3000/api/user/login', loginData).subscribe(
      (response: any) => {
        // Handle successful login
        console.log('Login successful', response);
        this.loginSuccessMessage = response.message;
        this.loginErrorMessage = ''; // Reset error message
      },
      (error) => {
        // Handle login error
        console.error('Login error', error);
        this.loginSuccessMessage = '';
        this.loginErrorMessage = error.error.message; // Set error message
      }
    );
  }

  signup() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const registrationData = {
      name: this.registerForm.controls?.['name'].value,
      email: this.registerForm.controls['email'].value,
      phone: this.registerForm.controls['mobile'].value,
      password: this.registerForm.controls['password'].value,
      password_confirmation:
        this.registerForm.controls['password_confirmation'].value,
    };

    // Send sign up request
    this.http
      .post('http://localhost:3000/api/user/signup', registrationData)
      .subscribe(
        (response: any) => {
          // Handle successful sign up
          console.log('Signup successful', response);
          this.signupSuccessMessage = response.message;
          this.signupErrorMessage = ''; // Reset error message
        },
        (error) => {
          // Handle sign up error
          console.error('Signup error', error);
          (this.signupSuccessMessage = ''),
            (this.signupErrorMessage = error.error.message); // Set error message
        }
      );
  }

  closeModal() {
    // Implement logic to close the modal
  }

  toggleForm(form: 'login' | 'signup') {
    this.activeForm = form;
  }

  loginShowClick() {
    this.loginShow = !this.loginShow;
  }

  signUpShowClick() {
    this.signupShow = true;
  }
}
