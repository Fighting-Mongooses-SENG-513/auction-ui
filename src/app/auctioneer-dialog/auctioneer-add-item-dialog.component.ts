import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject} from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AuctionItem } from '../models/auction-item.model';
import {MatSelectModule} from '@angular/material/select';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'auctioneer-add-item-dialog',
  templateUrl: './auctioneer-add-item-dialog.component.html',
  styleUrls: ['./auctioneer-add-item-dialog.component.scss']
})
export class AuctioneerAddItemDialog {
  tagsList: string[] = ['Automotive', 'Books', 'Clothing', 'Electronics', 'Jewelry', 'Kitchen', 'Movies', 'Music', 'Sports'];

  missingFields = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AuctioneerAddItemDialog>,
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
