import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://demo.duendesoftware.com',
  clientId: 'interactive.public', // The "Auth Code + PKCE" client
  responseType: 'code',
  redirectUri: window.location.origin + '/dashboard',
  
  scope: 'openid profile email', // Ask offline_access to support refresh token refreshes
  

  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  nonceStateSeparator : 'semicolon', // Real semicolon gets mangled by Duende ID Server's URI encoding
  oidc: true,
  strictDiscoveryDocumentValidation: false,
  userinfoEndpoint: 'https://demo.duendesoftware.com/connect/userinfo',
  postLogoutRedirectUri: window.location.origin + '/login'

};