import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

type Bid = {
  auctionId: String,
  bidAmount: Number
}

@Component({
  selector: 'app-bid-dialog',
  templateUrl: './bid-dialog.component.html',
  styleUrls: ['./bid-dialog.component.sass']
})
export class BidDialogComponent {

  invalidFields = false;

  constructor(
    public dialogRef: MatDialogRef<BidDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bid
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  bid() {
    if (this.data.bidAmount === null || this.data.bidAmount <= 0.0) {
      this.invalidFields = true;
      return;
    } else {
      this.dialogRef.close(this.data);
    }
  }
}
