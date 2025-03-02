import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): boolean {
    const roleName = this.authService.getRoleName();

    if (roleName === 'CTO' || roleName === 'Tech-Lead') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
