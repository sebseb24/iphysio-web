import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NouveauPatientComponent } from './nouveau-patient/nouveau-patient.component';

import {MatDialogModule} from '@angular/material/dialog';
import { ProgrammeExerciceComponent } from './programme-exercice/programme-exercice.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './material-module';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './auth/create-user/create-user.component';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HistoriqueActiviteComponent } from './historique-activite/historique-activite.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientDetailComponent,
   NouveauPatientComponent,
   ProgrammeExerciceComponent,
   LoginComponent,
   DashboardComponent,
   CreateUserComponent,
   ConfirmDialogComponent,
   HistoriqueActiviteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutocompleteLibModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'create-user',
        component: CreateUserComponent
      },
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }

    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    DemoMaterialModule,
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent],

  entryComponents: [NouveauPatientComponent]
})
export class AppModule { }
