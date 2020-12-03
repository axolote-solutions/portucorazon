import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-weighing-message',
  templateUrl: './weighing-message.component.html',
  styleUrls: ['./weighing-message.component.scss']
})
export class WeighingMessageComponent implements OnInit {

  constructor(
    public weighingDialog: MatDialogRef<WeighingMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]) {

  }

  ngOnInit(): void {
  }

  public closeMe() {
    this.weighingDialog.close();
  }

  messageTitle (message: string): string {
    let i = message.indexOf(":");

    return message.substring(0, i);
  }

  messageText (message: string): string {
    let i = message.indexOf(":");

    return message.substring(i +1);
  }

}
