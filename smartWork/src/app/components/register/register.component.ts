import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user = new User();
  errorShow = false;
  message = 'Some Error Occured while registering the user';
  constructor(public registerService: RegisterService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.compose([Validators.required, Validators.minLength(3)])]],
      password:  ['', [Validators.compose([Validators.required, Validators.minLength(3)])]],
      empId: ['', [Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('[0-9]*')])]],
      contact: ['', [Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])]],
      email: ['', [Validators.compose([Validators.required, Validators.email])]]
    });
  }
  submitregistrationForm() {
    if ( this.registrationForm.valid) {
    this.user.userName = this.registrationForm.controls.userName.value;
    this.user.password = this.registrationForm.controls.password.value;
    this.user.EmpId = this.registrationForm.controls.empId.value;
    this.user.mobile = this.registrationForm.controls.contact.value;
    this.user.email = this.registrationForm.controls.email.value;
    this.registerService.register(this.user).subscribe((response) => {
      if (response.success === true) {
        this.router.navigate(['login']);
      } else {
        this.errorShow = true;
        this.registrationForm.reset();
      }
    }, (error) => {
      this.errorShow = true;
        this.registrationForm.reset();
    });
  } else {
    this.registrationForm.reset();
  }
}
  modalClosed() {
    this.errorShow = false;
    this.registrationForm.reset();
  }

}
