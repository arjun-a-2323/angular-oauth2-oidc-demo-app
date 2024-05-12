import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { filter, map, of, switchMap, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isDoneLoading$.pipe(
    tap((isDoneLoading) => console.log('isDoneLoading', isDoneLoading)),
    filter((isDoneLoading) => isDoneLoading),
    switchMap((_) => authService.isAuthenticated$),
    tap((isAuthenticated) => console.log('isAuthenticated', isAuthenticated)),
    tap((isAuthenticated) => isAuthenticated || router.navigate(['/login']))
  );
};
