import { Component } from '@angular/core';
//import * as firebase from 'firebase';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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


  constructor() {
    //firebase.initializeApp(config);
    firebase.initializeApp(config);
  }
}
