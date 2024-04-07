import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  isLoginPopupVisible: boolean = false;

  // redirectToSignup() {
  //   this.isLoginPopupVisible = true;
  // }

  redirectToSignup() {
    this.router.navigate(['/signup']); // Update '/signup' with the route to your signup component
  }
}
