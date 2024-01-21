import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('formSignIn', { static: false }) formSignIn?: ElementRef;
  @ViewChild('formSignUp', { static: false }) formSignUp?: ElementRef;


  onSignInClick() {
    if (this.formSignIn && this.formSignUp) {
      this.formSignUp.nativeElement.classList.add('hide');
      this.formSignIn.nativeElement.classList.remove('hide');
    }
  }

  onSignUpClick() {
    if (this.formSignIn && this.formSignUp) {
      this.formSignIn.nativeElement.classList.add('hide');
      this.formSignUp.nativeElement.classList.remove('hide');
    }
  }
}