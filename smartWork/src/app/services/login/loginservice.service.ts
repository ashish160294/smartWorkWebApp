import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  IsUserLoggedIn = false;
  loggedInUser: any;
  loggedInUserSubject = new Subject();

  constructor(private http: HttpClient) {
  }
  logout() {
    this.loggedInUserSubject.next(null);
    this.IsUserLoggedIn = false;
    this.loggedInUser = null;
  }

  login(username, password): Observable<any> {
    return this.http.post('http://localhost:3000/login', { username: username, password: password })
    .pipe(map((response: Response) => {
      if (response) {
        this.IsUserLoggedIn = true;
        this.loggedInUser = response;
        this.loggedInUserSubject.next(response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          return {success: true, details: response};
      } else {
        this.IsUserLoggedIn = false;
        return {success: false};
      }
    }));
  }
}
