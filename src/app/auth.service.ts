import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';
import { authConfig } from './oauth2-oidc-config';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  private isTriggeredByLogin = false;

  constructor(private oauthService: OAuthService) {
    oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      if (!this.isTriggeredByLogin || this.oauthService.hasValidIdToken()) {
        console.log('isLoaded true');
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidIdToken());
        this.isDoneLoadingSubject$.next(true);
      }
    });
    this.oauthService.events.subscribe((e) => {
      console.log('oauth/oidc event', e.type);
      if (e.type === 'token_received') {
        console.log('received token');

        this.isAuthenticatedSubject$.next(this.oauthService.hasValidIdToken());
        this.isDoneLoadingSubject$.next(true);
        console.log(
          'AuthService.constructor token_recieved end hasToken: ' +
            this.oauthService.hasValidIdToken()
        );
      }
    });
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  login(data: any) {
    this.oauthService.initCodeFlow();
    sessionStorage.setItem('id_token', this.oauthService.getIdToken());
    sessionStorage.setItem('access_token', this.oauthService.getAccessToken());
    return data;
  }

  loginWithIDP() {
    this.isDoneLoadingSubject$.next(false);
    this.isTriggeredByLogin = true;
    this.oauthService.initCodeFlow();
    sessionStorage.setItem('id_token', this.oauthService.getIdToken());
    sessionStorage.setItem('access_token', this.oauthService.getAccessToken());
  }

  logout() {
    return new Promise<void>((resolve) => {
      this.oauthService.logOut();
      setTimeout(resolve, 1000);
    }).then(() => {
      sessionStorage.clear();
      this.isAuthenticatedSubject$.next(false);
      this.isDoneLoadingSubject$.next(true);
    });
  }

  loadUserProfile() {
    console.log('loadUserProfile');
    return this.oauthService.loadUserProfile();
  }
}
