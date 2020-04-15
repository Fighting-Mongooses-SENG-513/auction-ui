import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
//import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-auctioneer-add-item-dialog',
  templateUrl: './auctioneer-add-item-dialog.component.html',
  styleUrls: ['./auctioneer-add-item-dialog.component.scss']
})
export class AuctioneerAddItemDialogComponent {
  tagsList: string[] = ['Automotive', 'Books', 'Clothing', 'Electronics', 'Jewelry', 'Kitchen', 'Movies', 'Music', 'Sports'];

  missingFields = false;
  imagePointer: File = null;
  clientID: string = 'dd65a136a77f9f3';
  uploadUrl: string = 'https://api.imgur.com/3/image';

  constructor(
    public dialogRef: MatDialogRef<AuctioneerAddItemDialogComponent>, private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: AuctionItem) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onFileSelected(event) {
    this.imagePointer = event.target.files[0];
    const formData = new FormData();
    formData.append('image', this.imagePointer, this.imagePointer.name);

    let header = new HttpHeaders({"authorization": 'Client-ID '+this.clientID});

    const imageData = await this.http.post(this.uploadUrl, formData, {headers:header}).toPromise();
    this.data.imageUrl = imageData['data'].link;
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
