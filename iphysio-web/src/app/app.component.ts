import { Component } from '@angular/core';
import * as firebase from 'firebase';

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
    firebase.initializeApp(config);
  }
}
