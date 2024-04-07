import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  remember: boolean = false;
  loginMessage: string = '';
  fullName: string = '';
  signupEmail: string = '';
  mobile: string = '';
  signupPassword: string = '';
  confirmPassword: string = '';
  activeForm: 'login' | 'signup' = 'login';

  login() {
    // Login logic
  }

  signup() {
    // Signup logic
  }

  closeModal() {
    // Implement logic to close the modal
  }

  toggleForm(form: 'login' | 'signup') {
    this.activeForm = form;
  }
}
