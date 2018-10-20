import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request } from '../../models/request';
import { RequestService} from '../../services/request/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  reqForm: FormGroup;
  request = new Request();
  showError = false;
  constructor(public formBuilder: FormBuilder, private reqService: RequestService, private router: Router) { }

  ngOnInit() {
    this.reqForm = this.formBuilder.group({
      applyDate: ['', Validators.required],
      desc: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      manager: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      contact: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      empId: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      EmployeeName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }
  submitrequestForm() {
    this.request.workingDate = this.reqForm.controls.applyDate.value;
    this.request.username = this.reqForm.controls.EmployeeName.value;
    this.request.EmpId = this.reqForm.controls.empId.value;
    this.request.mobile = this.reqForm.controls.contact.value;
    this.request.email = this.reqForm.controls.email.value;
    this.request.desc = this.reqForm.controls.desc.value;
    this.request.manager = this.reqForm.controls.manager.value;
    this.reqService.submitRequest(this.request).subscribe((data) => {
      if (data['success'] === true) {
        this.router.navigate(['user/dashboard']);
      } else {
        this.reqForm.reset();
      }
    }, (err) => {
      this.showError = true;
    });
  }
  }
