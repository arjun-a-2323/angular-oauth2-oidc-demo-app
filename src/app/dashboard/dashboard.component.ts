import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  authService = inject(AuthService);
  router = inject(Router);

  id_token!: Observable<string>;
  decoded_id_token!: Observable<string>;
  access_token!: Observable<string>;
  decoded_access_token!: Observable<string>;

  ngOnInit(): void {
    this.id_token = of(sessionStorage.getItem('id_token') ?? '');
    this.id_token.subscribe(token => {
      this.decoded_id_token = of(this.authService.decodeToken(token));
    });
    this.access_token = of(sessionStorage.getItem('access_token') ?? '');
    this.access_token.subscribe(token => {
      this.decoded_access_token = of(this.authService.decodeToken(token));
    });
  }


  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }




}
