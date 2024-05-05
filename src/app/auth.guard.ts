import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const  authService  =  inject(AuthService);
  const  router  =  inject(Router);

  // return authService.isLoggedIn().pipe(
  //   map(isLoggedIn => {
  //     if (isLoggedIn) {
  //       return true;
  //     } else {
  //       router.navigate(['/login']);
  //       return false;
  //     }
  //   })
  // );

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false
};
