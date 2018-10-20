import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from './services/login/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
userDetails: any;

  constructor(private loginservice: LoginserviceService, private router: Router) {}
 ngOnInit() {
  this.loginservice.loggedInUserSubject.subscribe((data) => {
    console.log(data);
    this.userDetails = data;
   });
 }
 logout() {
  this.loginservice.logout();
  this.router.navigate(['login']);
 }
}
