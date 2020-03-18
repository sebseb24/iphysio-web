import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { AdminComponent } from './auth/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './auth/create-user/create-user.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientDetailComponent,
   NouveauPatientComponent,
   ProgrammeExerciceComponent,
   LoginComponent,
   AdminComponent,
   DashboardComponent,
   CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'create-user',
        component: CreateUserComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    DemoMaterialModule,
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent],

  entryComponents: [NouveauPatientComponent]
})
export class AppModule { }
