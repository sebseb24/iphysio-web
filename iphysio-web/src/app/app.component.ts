import { Component } from '@angular/core';
import * as firebase from 'firebase';

import { AccountService } from './auth/_services';
import { User } from './auth/_models';

const config  = { 
  apiKey: 'AIzaSyCFdqmK7iI-lbmtkEvrXopDrsOIhIzuZRE',
   databaseURL: 'https://iphysio-55674.firebaseio.com'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iPhysio';
  user: User;


  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    firebase.initializeApp(config);
  }

  logout() {
    this.accountService.logout();
}
}
