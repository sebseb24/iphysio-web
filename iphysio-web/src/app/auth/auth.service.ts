import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Physio } from '../../../NodeJS/models/physios';

//const bcrypt = require('bcryptjs');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURL = 'http://localhost:3000/physios';

  constructor(private http: HttpClient) { }

  checkLogin(physio: Physio) {
    return this.http.post(this.baseURL + '/login', physio);
  }

  createUser(physio: Physio) {
    /*bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(physio.password, salt, (err, hash) => {
        physio.password = hash;
        physio.saltSecret = salt;
      });
    });*/

    return this.http.post(this.baseURL, physio);
  }
}
