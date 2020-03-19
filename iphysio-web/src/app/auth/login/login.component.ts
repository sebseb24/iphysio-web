import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm, NgModel} from "@angular/forms";
import { Router } from '@angular/router';

// DOC : https://www.youtube.com/watch?v=-YBiNdCRggs&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=16

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  wrongCred = false;

  ngOnInit(): void {
  }

  onLoginSubmit(form: NgForm) {
      this.authService.checkLogin(form.value).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          this.wrongCred = true;
        }
      )
  }
}
