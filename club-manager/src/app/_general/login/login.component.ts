import { CommonValues } from '../../_shared/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FooterStatusService } from '../../app-footer-status.service';
import { UserStoreService } from '../users/user-store.service';
import { TokenStorageService } from '../../_shared/token-storage.service';
import { HeaderService } from 'src/app/app-header.service';
import { Router } from '@angular/router';
import { User } from '../users/user';

@Component({
  selector: 'cl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private statusService: FooterStatusService,
    private userService: UserStoreService,
    private tokenStore: TokenStorageService,
    private headerService: HeaderService,
    private router: Router) { }

  loginForm: FormGroup;
  hide = true;

  ngOnInit(): void {
    console.log("HEADER 98");
    this.headerService.nextMessage(98);
    this.reactiveForm();
  }

  /* Reactive form */
  reactiveForm(): void  {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm(): void {
    const formValue = this.loginForm.value;
    const newUser: User = {...formValue };
    this.userService.login(newUser).subscribe( v => {
      // console.log('LoginComponent.SubmitForm.accessToken:', v.accessToken);
      this.tokenStore.saveToken(v.accessToken);
      CommonValues.isAuthenticated = true;
      if (v.accessToken === undefined) {
        this.tokenStore.signOut();
        this.statusService.nextMessage("Fehler","Authentifizierung schlug fehl!");
        // CommonValues.isAuthenticated = false;
      }
      else {
        //console.log('LoginComponent.SubmitForm: GOTO DASHBOARD');
        this.statusService.nextMessage("Bereit","");
        this.router.navigate(['dashboard']);
      }
    });
  }

}
