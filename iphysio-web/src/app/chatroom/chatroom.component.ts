import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
//import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { Patient } from '../../../NodeJS/models/patients';
import { PatientService } from '../patients/patient.service';
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
  nickname = '';
  roomname = '';
  message = '';
  users = [];
  chats = [];
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe,
              public patientService: PatientService,
              private _router: Router) {
                this.nickname = localStorage.getItem('nickname');
                this.roomname = this.route.snapshot.params.roomname;
                firebase.database().ref('chats/').on('value', resp => {
                  this.chats = [];
                  this.chats = snapshotToArray(resp);
                  setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
                });
                firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
                  const roomusers = snapshotToArray(resp2);
                  this.users = roomusers.filter(x => x.status === 'online');
                });

                this.refreshPatientList();
                console.log("les moves s'en viennent, mais elles s'en viennent tu vraiment ? ");
              }

  ngOnInit(): void {
          this.chatForm = this.formBuilder.group({
             'message' : [null, Validators.required]
          });
          
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }

  exitChat() {
    const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.nickname} leave the room`;
    chat.type = 'exit';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === this.nickname);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({status: 'offline'});
      }
    });

    this.router.navigate(['/roomlist']);
  }

  // openDialog() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = "500px";
  //   dialogConfig.height = "inherit";
  //   //dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   dialogConfig.data = {
  //     id: 1,
  //     title: 'Angular For Beginners'
  //   };

  //   this.dialog.open(NouveauPatientComponent, dialogConfig);
  // }

  // displayArchive() {
  //   this.clearDisplay();
  //   this.dispArchive = true;
  // }

  refreshPatientList() {
    this.patientService.getPatientList(localStorage.getItem('_id')).subscribe(
      (res) => {
        // this.patientService.patients = res as Patient[];
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
    
  }
}
