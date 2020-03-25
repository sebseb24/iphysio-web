import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Physio } from '../../../NodeJS/models/physios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURL = 'http://localhost:3000/physios';
  connectedUser = new Physio;

  constructor(private _http: HttpClient, private _router: Router) { }

  checkLogin(physio: Physio) {
    return this._http.post<any>(this.baseURL + '/login', physio);
  }

  createUser(physio: Physio) {
    return this._http.post<any>(this.baseURL, physio);
  }

  loggedIn() {
    return !!localStorage.getItem('token'); // !! return boolean
  }

  logoutUser() {
    //localStorage.removeItem('token');
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
