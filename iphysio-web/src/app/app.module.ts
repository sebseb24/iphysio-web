import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//import { PatientsComponent } from './patients/patients.component';
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
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientArchiveComponent } from './patient-archive/patient-archive.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ConnectComponent } from './connect/connect.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    
    PatientDetailComponent,
   NouveauPatientComponent,
   ProgrammeExerciceComponent,
   LoginComponent,
   DashboardComponent,
   CreateUserComponent,
   ConfirmDialogComponent,
   HistoriqueActiviteComponent,
   EditPatientComponent,
   PatientArchiveComponent,
   LineChartComponent,
   PieChartComponent,
   routingComponents,
   ConnectComponent,
   RoomlistComponent,
   AddroomComponent,
   ChatroomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
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
  providers: [DatePipe, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent],

  entryComponents: [NouveauPatientComponent]
})
export class AppModule { }
