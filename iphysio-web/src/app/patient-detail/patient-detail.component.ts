import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../patient';


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  @Input() patient: Patient

  constructor() { }

  ngOnInit(): void {
  }

}
