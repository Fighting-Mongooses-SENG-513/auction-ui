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
  public min: Date;
  tagsList: string[] = ['Automotive', 'Books', 'Clothing', 'Electronics', 'Jewelry', 'Kitchen', 'Music', 'Sports'];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AuctioneerAddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AuctionItem) {
      this.min = new Date();
      this.min.setDate(this.min.getDate() + 1);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
