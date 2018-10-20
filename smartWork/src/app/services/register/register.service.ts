import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registrationUrl = 'http://localhost:3000/register';

  constructor(public http: HttpClient) { }
  register(user: User): Observable<any> {
    return this.http.post(this.registrationUrl, user);
  }
}
