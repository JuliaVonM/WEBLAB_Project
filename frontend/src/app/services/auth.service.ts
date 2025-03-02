import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {RoleService} from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router, private roleService: RoleService) {}

  login(email: string, password: string): Observable<{token: string}> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        this.tokenSubject.next(response.token);
      })
    );
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  getRoleId() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    } catch (error) {
      console.error('Error while decoding the token:', error);
      return null;
    }
  }

  getRoleName() {
    const roleId = this.getRoleId();
    const roles = this.roleService.getCachedRoles();
    return roles.find(r => r._id === roleId)?.name;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}
