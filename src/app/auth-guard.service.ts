import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated().then((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        this.authService.redirectUrl = state.url;
        window.alert('You are not authorized');
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
