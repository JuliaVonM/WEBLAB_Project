import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Role} from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://localhost:3000/api/roles';
  private roles: Role[] = new Array<Role>();

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      tap((roles) => {
          this.roles = roles;
        }
      ));
  }

  getCachedRoles(): Role[] {
    return this.roles;
  }
}
