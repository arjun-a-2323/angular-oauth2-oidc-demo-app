import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  authService = inject(AuthService);
  router = inject(Router);

  // id_token!: Observable<string>;
  // decoded_id_token!: Observable<string>;
  // access_token!: Observable<string>;
  // decoded_access_token!: Observable<string>;

  id_token: string='';
  decoded_id_token: string='';
  access_token: string='';
  decoded_access_token: string='';
  userProfile: any;

  ngOnInit(): void {

    // this.id_token = of(sessionStorage.getItem('id_token') ?? '');
    // this.id_token.subscribe(token => {
    //   this.decoded_id_token = of(this.authService.decodeToken(token));
    // });
    // this.access_token = of(sessionStorage.getItem('access_token') ?? '');
    // this.access_token.subscribe(token => {
    //   this.decoded_access_token = of(this.authService.decodeToken(token));
    // });

this.id_token = sessionStorage.getItem('id_token')?? '';
this.decoded_id_token = this.authService.decodeToken(this.id_token);
this.access_token = sessionStorage.getItem('access_token')?? '';  
this.decoded_access_token = this.authService.decodeToken(this.access_token);  

this.authService.loadUserProfile().then(profile => {
  console.log(profile);
  this.userProfile = profile;

  });
}


  public logout(){
    this.authService.logout();
       this.router.navigate(['/login']);
  }




}
