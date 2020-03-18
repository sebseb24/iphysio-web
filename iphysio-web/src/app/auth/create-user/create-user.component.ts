import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateUserSubmit(form: NgForm) {
      this.authService.createUser(form.value).subscribe((res) => {
        this.router.navigate(['/login']);
      });
  }
}
