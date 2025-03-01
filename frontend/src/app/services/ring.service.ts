import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ring} from '../interfaces/ring';

@Injectable({
  providedIn: 'root'
})
export class RingService {

  private apiUrl = 'http://localhost:3000/api/rings';

  constructor(private http: HttpClient) {
  }

  getRings(): Observable<Ring[]> {
    return this.http.get<Ring[]>(this.apiUrl);
  }
}
