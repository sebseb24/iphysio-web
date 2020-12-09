import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Patient } from '../../../NodeJS/models/patients';
import { PatientService } from '../../../NodeJS/services/patients/patient.service';
import { HttpErrorResponse } from '@angular/common/http';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;
  patientsList: Patient[];

  chatForm: FormGroup;
  users = [];
  chats = [];
  physioId = localStorage.getItem('_id');
  public userSelected: Patient;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe,
              public patientService: PatientService,
              private _router: Router) {
                this.refreshPatientList();
              }

  ngOnInit(): void {
          this.chatForm = this.formBuilder.group({
             'message' : [null, Validators.required]
          });
          
  }

  onFormSubmit(form: any) {
    let chat = form;

    chat.fromId = this.physioId;
    chat.timestamp = Math.trunc(Date.now()/1000);
    chat.toId = this.userSelected._id;
    let newMessageFrom = firebase.database().ref('user-messages/' + chat.toId + '/' + chat.fromId + '/').push();
    let newMessageTo = firebase.database().ref('user-messages/' + chat.fromId + '/' + chat.toId + '/').push();
    newMessageFrom.set(chat);
    newMessageTo.set(chat);
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }


  refreshPatientList() {
    this.patientService.getPatientList(localStorage.getItem('_id')).subscribe(
      (res) => {
        this.patientService.patients = res as Patient[];
        this.patientsList = this.patientService.patients;
      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
            localStorage.removeItem('token');
            this._router.navigate(['/login']);
          }
        }
      });
  }

  openConversation(patient) {
    this.userSelected = patient;

    for(let patient of this.patientsList) {
      patient.active = false;
    }

    patient.active = !patient.active;   
    let path = 'user-messages/' + localStorage.getItem('_id') + '/' + patient._id + '/';
    firebase.database().ref(path).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp) as any[];
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
  }
}
