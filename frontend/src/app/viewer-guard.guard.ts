import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ViewerGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    const roleName = this.authService.getRoleName();

    if (roleName === 'Mitarbeiter' || roleName === 'Tech-Lead' || roleName === 'CTO') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
