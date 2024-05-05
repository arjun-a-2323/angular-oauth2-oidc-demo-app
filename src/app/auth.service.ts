import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';
import { authConfig } from './oauth2-oidc-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private oauthService: OAuthService) {
    oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.events.subscribe(e => {
      console.log('oauth/oidc event', e.type);
      if(e.type === 'token_received'){
        console.log('received token');
        this.isAuthenticated.next(true);
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
  this.isAuthenticated.next(false);
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
