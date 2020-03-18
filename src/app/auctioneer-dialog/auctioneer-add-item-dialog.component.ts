import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject} from '@angular/core';

export interface AuctioneerAddItemDialogData {
  itemName: string;
  minimumBid: number;
  startTime: string;
  endTime: string;
}

@Component({
  selector: 'auctioneer-add-item-dialog',
  templateUrl: './auctioneer-add-item-dialog.component.html',
  styleUrls: ['./auctioneer-add-item-dialog.component.scss']
})
export class AuctioneerAddItemDialog {

  constructor(
    public dialogRef: MatDialogRef<AuctioneerAddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AuctioneerAddItemDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
