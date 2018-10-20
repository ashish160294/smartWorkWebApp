import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginserviceService } from '../login/loginservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getRequestUrl = 'http://localhost:3000/userequests';

  constructor(private http: HttpClient, private loginService: LoginserviceService) { }
fetchUserRequests(): Observable<any> {
  return this.http.post(this.getRequestUrl, {
    'userName': this.loginService.loggedInUser.UserName
  });
}
fetchAllRequests(): Observable<any> {
  return this.http.get('http://localhost:3000/requests');
}
updateStatus(payload) {
  return this.http.post('http://localhost:3000/updateReqStatus', payload);
}
}
