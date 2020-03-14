import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients/patients.component';
//import { MockPatientComponent } from './mock-patient/mock-patient.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NouveauPatientComponent } from './nouveau-patient/nouveau-patient.component';

import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientsComponent,
   // MockPatientComponent,
    PatientDetailComponent,
   NouveauPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],

  entryComponents: [NouveauPatientComponent]
})
export class AppModule { }
