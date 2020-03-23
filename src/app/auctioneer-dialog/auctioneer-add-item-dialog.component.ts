import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject} from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AuctionDialog } from '../models/auction-dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'auctioneer-add-item-dialog',
  templateUrl: './auctioneer-add-item-dialog.component.html',
  styleUrls: ['./auctioneer-add-item-dialog.component.scss']
})
export class AuctioneerAddItemDialog {
  public min: Date;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AuctioneerAddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AuctionDialog) {
      this.min = new Date();
      this.min.setDate(this.min.getDate() + 1);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
