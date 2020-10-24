import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NouveauPatientComponent } from '../nouveau-patient/nouveau-patient.component';
import { AuthService } from '../auth/auth.service';
import { Physio } from '../../../NodeJS/models/physios';
import { Patient } from '../../../NodeJS/models/patients';
import { PatientService } from '../patients/patient.service';
import { Historique } from '../../../NodeJS/models/historique';
import { HistoriqueService } from '../../../NodeJS/services/historique.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountService } from '../auth/_services';
import { User } from '../auth/_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  connectedUser = new Physio;
  keyword = 'name';
  data: Patient[];

  dispArchive : boolean;
  dispPatientDetail : boolean;
  user: User;
 
  constructor(private accountService: AccountService, private dialog: MatDialog, private _authService: AuthService, public patientService: PatientService, public historiqueService: HistoriqueService,private _router: Router) {

  }

  ngOnInit(): void {
    this.connectedUser.name = localStorage.getItem('username');
    this.connectedUser._id = localStorage.getItem('_id');
    this.refreshPatientList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    //dialogConfig.disableClose = true;
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

  logout() {
    this.accountService.logout();
}

  onSelect(patient: Patient): void {

    this.displayPatientDetail();

    this.patientService.selectedPatient = patient;

    this.patientService.getProgrammeList(patient._id).subscribe(
      (res) => {
        this.patientService.programmeList= res as any[];
        console.log(this.patientService.programmeList);
      },
      (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401 || err.status === 500) {
          }
        }
      });

      this.historiqueService.getHistoriqueList(this.patientService.selectedPatient._id).subscribe(
        (res) => {
          this.historiqueService.historique = res as Historique[];
        },
        (err) => {
        });
  }

  refreshPatientList() {
    this.patientService.getPatientList(localStorage.getItem('_id')).subscribe(
      (res) => {
        this.patientService.patients = res as Patient[];
        this.data = this.patientService.patients;
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
 
 
  selectEvent(item) {
    this.onSelect(item);
  }
  
  onFocused(e){
    this.refreshPatientList();
    console.log("onChangeSearch : " + e);
  }

  displayArchive() {
    this.clearDisplay();
    this.dispArchive = true;
  }

  displayPatientDetail() {
    this.clearDisplay();
    this.dispPatientDetail = true;
  }

  clearDisplay() {
    this.dispPatientDetail = false;
    this.dispArchive = false;
  }

}
