import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NouveauPatientComponent } from '../nouveau-patient/nouveau-patient.component';
import { AuthService } from '../auth/auth.service';
import { Physio } from '../../../NodeJS/models/physios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  connectedUser = new Physio;

  constructor(private dialog: MatDialog, private _authService: AuthService) {

  }

  ngOnInit(): void {
    this.connectedUser.name = localStorage.getItem('username');
    this.connectedUser._id = localStorage.getItem('_id');
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.dialog.open(NouveauPatientComponent, dialogConfig);
  }

  onLogout() {
    this._authService.logoutUser();
  }

}
