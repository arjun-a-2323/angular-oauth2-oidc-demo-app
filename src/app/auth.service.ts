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

  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$
  ]).pipe(map(values => values.every(b => b)));

  constructor(private oauthService: OAuthService) {
    oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      this.isDoneLoadingSubject$.next(true);
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidIdToken());
    } );
    this.oauthService.events.subscribe(e => {
      console.log('oauth/oidc event', e.type);
      if(e.type === 'token_received'){
        console.log('received token');
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidIdToken());
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
  
  this.oauthService.initCodeFlow();
  sessionStorage.setItem('id_token', this.oauthService.getIdToken());
    sessionStorage.setItem('access_token', this.oauthService.getAccessToken());
  }

logout() {
  this.oauthService.logOut();
  sessionStorage.clear();
  this.isAuthenticatedSubject$.next(false);
  this.isDoneLoadingSubject$.next(false);
}

isLoggedIn() {
  // const id_token = this.oauthService.getIdToken();
  // const access_token = this.oauthService.getAccessToken();
  //if(id_token !== null && id_token !== undefined && id_token !== '' && id_token !== 'null' && id_token !== 'undefined'){
    //sessionStorage.setItem('id_token', id_token);
  //}
  //if(access_token !== null && access_token !== undefined && access_token !== '' && access_token !== 'null' && access_token !== 'undefined'){
    //sessionStorage.setItem('access_token',access_token);
  //}
 

 
 //return sessionStorage.getItem('id_token')!== null;
//  this.isAuthenticated.asObservable().subscribe(isAuthenticated => { 
//     return isAuthenticated;
//   });
//  return false; 
console.log('hasValidIdToken? >', this.oauthService.hasValidIdToken());
return this.oauthService.hasValidIdToken();
}

loadUserProfile() {
  return this.oauthService.loadUserProfile();
}

}
