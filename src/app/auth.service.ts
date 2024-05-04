import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';
import { authConfig } from './oauth2-oidc-config';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {

  

  constructor(private oauthService: OAuthService) {
    oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
   }

    decodeToken(token: string): any {
      return JSON.stringify(jwtDecode(token));
      
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
  sessionStorage.removeItem('id_token');
  sessionStorage.removeItem('access_token');
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
 

 
 return sessionStorage.getItem('id_token')!== null;
}

}
