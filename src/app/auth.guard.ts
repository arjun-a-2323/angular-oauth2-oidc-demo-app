import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const  authService  =  inject(AuthService);
  const  router  =  inject(Router);

  // return authService.canActivateProtectedRoutes$.pipe(
  //   map(isLoggedIn => {
  //     if (isLoggedIn) {
  //       return true;
  //     } else {
  //       router.navigate(['/login']);
  //       return false;
  //     }
  //   })
  // );

  // if (authService.isLoggedIn()) {
  //   return true;
  // }
  // router.navigate(['/login']);
  // return false

  return authService.canActivateProtectedRoutes$.pipe(
    filter(isDoneLoading => isDoneLoading),
    switchMap(_ => authService.isAuthenticated$),
    tap(isAuthenticated => isAuthenticated || router.navigate(['/login'])),
  );

  
    
};
