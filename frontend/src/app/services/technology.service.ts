import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Technology} from '../interfaces/technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private apiUrl = 'http://localhost:3000/api/technologies';

  constructor(private http: HttpClient) {
  }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.apiUrl);
  }

  getPublishedTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.apiUrl}/published`);
  }

  getTechnologyById(id: string): Observable<Technology> {
    return this.http.get<Technology>(`${this.apiUrl}/${id}`);
  }

  createTechnology(technology: Technology): Observable<Technology> {
    return this.http.post<Technology>(this.apiUrl, technology);
  }

  publishTechnology(technology: Technology): Observable<Technology> {
    return this.http.put<Technology>(`${this.apiUrl}/publish/${technology._id}`, technology);
  }

  updateTechnology(technology: Technology): Observable<Technology> {
    return this.http.put<Technology>(`${this.apiUrl}/${technology._id}`, technology)
  }

  updateRingOfTechnology(technology: Technology): Observable<Technology> {
    return this.http.put<Technology>(`${this.apiUrl}/ring/${technology._id}`, technology);
  }

  deleteTechnology(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
