import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  authService = inject(AuthService);
  router = inject(Router);

  id_token: string = '';
  decoded_id_token: any = '';
  access_token: string = '';
  decoded_access_token: any = '';

  ngOnInit(): void {
    this.id_token = sessionStorage.getItem('id_token') ?? '';
    this.decoded_id_token = this.authService.decodeToken(this.id_token);
    this.access_token = sessionStorage.getItem('access_token') ?? '';
    this.decoded_access_token = this.authService.decodeToken(this.access_token);
  }


  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }




}
