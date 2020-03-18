import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm, NgModel} from "@angular/forms";

// DOC : https://www.youtube.com/watch?v=-YBiNdCRggs&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=16

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
      this.authService.checkLogin(form.value).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {

        }
      );
  }
}
