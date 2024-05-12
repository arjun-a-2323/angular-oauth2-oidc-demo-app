import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  id_token!: Observable<string>;
  decoded_id_token!: Observable<string>;
  access_token!: Observable<string>;
  decoded_access_token!: Observable<string>;
  userProfile!: Observable<any>;

  ngOnInit(): void {
    this.id_token = of(sessionStorage.getItem('id_token') ?? '');
    this.id_token.subscribe((token) => {
      this.decoded_id_token = of(this.authService.decodeToken(token));
    });
    this.access_token = of(sessionStorage.getItem('access_token') ?? '');
    this.access_token.subscribe((token) => {
      this.decoded_access_token = of(this.authService.decodeToken(token));
    });

    this.authService.loadUserProfile().then((profile) => {
      console.log(profile);
      this.userProfile = of(profile);
    });
  }

  public logout() {
    this.authService.logout();
  }
}
