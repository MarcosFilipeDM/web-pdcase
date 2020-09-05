import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CheckPasswordComponent } from '../check-password/check-password.component';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.css']
})
export class ConfirmActionComponent implements OnInit {

  text = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CheckPasswordComponent>,
  ) { }

  ngOnInit() {
    this.text = this.data.text
  }

  yes(){
    this.dialogRef.close(true);
  }

  not(){
    this.dialogRef.close(false);
  }
}
