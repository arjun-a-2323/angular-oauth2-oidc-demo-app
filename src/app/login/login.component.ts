import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    username: new FormControl('', []),
    password: new FormControl('', [])
  })

  protected IDPloginForm = new FormGroup({
  })

  login(){
console.log('login');
if(this.loginForm.valid){
  console.log(this.loginForm.value);
  this.authService.login(this.loginForm.value)
  .subscribe((data: any) => {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
    console.log(data);
  });
}
  }

  loginWithIDP(){
console.log('loginWithIDP');
if(this.IDPloginForm.valid){
  console.log(this.IDPloginForm.value);
  this.authService.loginWithIDP();
if(this.authService.isLoggedIn()){
  this.router.navigate(['/dashboard']);

  }
}
  }
}
