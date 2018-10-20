import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginserviceService } from '../../services/login/loginservice.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showError = false;

  constructor(public fb: FormBuilder, public loginService: LoginserviceService, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.compose([Validators.required])])
    });
  }

  modalClosed() {
    console.log('closed');
    this.showError = false;
  }

  submitLoginForm() {
    this.loginService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe((response) => {
      if (response.success === true) {
        if (response.details.admin === true) {
          this.router.navigate(['user/admin/dashboard']);
        } else {
          this.router.navigate(['user/dashboard']);
        }
      } else {
        this.showError = true;
        this.loginForm.reset();
      }
    }, (error) => {
      this.showError = true;
        this.loginForm.reset();
    });
  }

}
