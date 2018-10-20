import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './modals/error/error/error.component';
import { SubmitRequestComponent } from './components/submit-request/submit-request.component';
import { AdminDashBoardComponent } from './components/admin-dash-board/admin-dash-board.component';
import { UserDashBoardComponent } from './components/user-dash-board/user-dash-board.component';
import { LoginGuard } from './guards/login/login.guard';

const route: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'login'},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'user', canActivate: [LoginGuard], canActivateChild: [LoginGuard], children: [
  { path: 'request', component: SubmitRequestComponent },
  { path: 'dashboard', component: UserDashBoardComponent},
  { path: 'admin', canActivate: [LoginGuard], canActivateChild: [LoginGuard], children: [{
    path: 'dashboard', component: AdminDashBoardComponent
  }]}
]},
{ path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    SubmitRequestComponent,
    AdminDashBoardComponent,
    UserDashBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
