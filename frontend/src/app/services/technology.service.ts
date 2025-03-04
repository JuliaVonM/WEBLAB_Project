import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Technology} from '../interfaces/technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private apiUrl = 'http://localhost:3000/api/technologies';

  constructor(private http: HttpClient) {
  }

  getTechnologies(published?: boolean): Observable<Technology[]> {
    let params = new HttpParams();
    if (published !== undefined) {
      params = params.set('published', published.toString());
    }
    return this.http.get<Technology[]>(this.apiUrl, { params });
  }

  getTechnologyById(id: string): Observable<Technology> {
    return this.http.get<Technology>(`${this.apiUrl}/${id}`);
  }

  createTechnology(technology: Technology): Observable<Technology> {
    return this.http.post<Technology>(this.apiUrl, technology);
  }

  updateTechnology(technology: Partial<Technology>): Observable<Technology> {
    return this.http.patch<Technology>(`${this.apiUrl}/${technology._id}`, technology);
  }

  deleteTechnology(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
