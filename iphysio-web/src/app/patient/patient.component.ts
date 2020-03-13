import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PatientService } from '../shared/patient.service';
import { Patient } from '../shared/patient.model';

declare var M: any;

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(public patientService: PatientService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshPatientList();
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
    }

    this.patientService.selectedPatient = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onSubmit(form : NgForm) {
    if(form.value._id == "") {
      this.patientService.postPatient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPatientList();
        M.toast({ html: 'Saved Succesfully', classes: 'rounded' });
      });
    }

    else {
      this.patientService.putPatient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPatientList();
        M.toast({ html: 'Updated Succesfully', classes: 'rounded' });
      });
    }
  }

  refreshPatientList() {
    this.patientService.getPatientList().subscribe((res) => {
      this.patientService.patients = res as Patient[];
    });
  }

  onEdit(pat : Patient) {
    this.patientService.selectedPatient = pat;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure to delete this record ?') == true) {
      this.patientService.deletePatient(_id).subscribe((res) => {
        this.resetForm(form);
        this.refreshPatientList();
        M.toast({ html: 'Delete Succesfully', classes: 'rounded' });
      });
    }
    
  }
}
