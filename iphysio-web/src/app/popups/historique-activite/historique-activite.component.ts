import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-historique-activite',
  templateUrl: './historique-activite.component.html',
  styleUrls: ['./historique-activite.component.scss']
})
export class HistoriqueActiviteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<HistoriqueActiviteComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
