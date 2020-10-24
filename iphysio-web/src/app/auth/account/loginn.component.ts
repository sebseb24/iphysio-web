import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import {NgForm, NgModel} from "@angular/forms";

import { AccountService, AlertService } from '../_services';

@Component({
    selector: 'app-loginn',
    templateUrl: './loginn.component.html',
    styleUrls: ['./loginn.component.scss']
  })

export class LoginnComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    wrongCred = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onLoginSubmit(form: NgForm) {
        this.authService.checkLogin(form.value).subscribe(
          res => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.user.name);
            localStorage.setItem('_id', res.user._id); 
            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
            this.wrongCred = true;
          }
        )
    }


    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}