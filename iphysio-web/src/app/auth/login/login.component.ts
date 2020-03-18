import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(form: NgForm) {
      this.authService.checkLogin(form.value).subscribe((res) => {
    });
  }
}
