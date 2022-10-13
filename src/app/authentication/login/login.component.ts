import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from './login.service';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public _loginForm: FormGroup = Object.create(null);
  // _loginForm!: FormGroup; 

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private loginService: LoginService,
    private handleToken: HandleTokenService) { }

  ngOnInit() {
    this._loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.loginService.onLogin(this._loginForm.value).subscribe({
      next: (response) => {
        console.log(response.token)
        this.handleToken.saveToken(response.token);
        this.handleToken.saveUser(response);
        // this.handleToken.autoLogout();
      },
      error:(error) => console.log("LOGIN ERROR: "+error),
      complete: () => {
       this.router.navigate(['/dashboards/dashboard1']);
      } 
    }).unsubscribe;

  }
}
