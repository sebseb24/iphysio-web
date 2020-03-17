import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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


@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientDetailComponent,
   NouveauPatientComponent,
   ProgrammeExerciceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
