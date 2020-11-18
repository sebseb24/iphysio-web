import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../patients/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  nom : string;
  email : string;
  telephone : string;
  adresse : string;

  constructor(private dialogRef: MatDialogRef<EditPatientComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService : PatientService) {
      this.nom = data.name;
      this.email = data.email;
      this.telephone = data.telephone;
      this.adresse = data.adresse;
     }

  ngOnInit(): void {
    
  }

  enregistrer() {
    console.log("Sauvegarde effectuée");
    console.log(this.email);

    console.log(this.data);
    this.data.name = this.nom;
    this.data.email = this.email;
    this.data.telephone = this.telephone;
    this.data.adresse = this.adresse;

    this.patientService.putPatient(this.data).subscribe(
      (res) => {
        console.log("fini");
        this.dialogRef.close();

      }, (err) => {
        console.log(err);
        this.dialogRef.close();
      }
    )

  }

  archiver() {
    this.data.isActive = false;

    this.patientService.putPatient(this.data).subscribe(
      (res) => {
        this.patientService.selectedPatient = null;
        this.dialogRef.close();

      }, (err) => {
        console.log(err);
        this.dialogRef.close();
      }
    )
  }

  annuler() {
    this.dialogRef.close();
  } 

}
