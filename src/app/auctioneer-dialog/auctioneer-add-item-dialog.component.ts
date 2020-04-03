import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';

@Component({
  selector: 'app-auctioneer-add-item-dialog',
  templateUrl: './auctioneer-add-item-dialog.component.html',
  styleUrls: ['./auctioneer-add-item-dialog.component.scss']
})
export class AuctioneerAddItemDialogComponent {
  tagsList: string[] = ['Automotive', 'Books', 'Clothing', 'Electronics', 'Jewelry', 'Kitchen', 'Movies', 'Music', 'Sports'];

  missingFields = false;

  constructor(
    public dialogRef: MatDialogRef<AuctioneerAddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuctionItem) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem() {
    if (this.data.name === '' || this.data.buyoutPrice === null
    || this.data.auctionDays === null || this.data.imageUrl === '' || this.data.tags.length < 1) {
      this.missingFields = true;
      return;
    } else {
      this.dialogRef.close(this.data);
    }
  }
}
