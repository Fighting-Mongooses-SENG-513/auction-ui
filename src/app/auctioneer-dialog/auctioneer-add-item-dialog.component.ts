import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
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
  clientID = 'dd65a136a77f9f3';
  uploadUrl = 'https://api.imgur.com/3/image';

  uploading = false;

  constructor(
    public dialogRef: MatDialogRef<AuctioneerAddItemDialogComponent>, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: AuctionItem) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event) {
    this.imagePointer = event.target.files[0];
  }

  removeImage() {
    this.imagePointer = null;
  }

  addItem() {
    if (this.data.name === '' || this.data.buyoutPrice === null
    || this.data.auctionDays === null || this.imagePointer === null || this.data.tags.length < 1) {
      this.missingFields = true;
      return;
    } else {
      this.uploading = true;
      const headers = new HttpHeaders({authorization: 'Client-ID ' + this.clientID});

      const formData = new FormData();
      formData.append('image', this.imagePointer, this.imagePointer.name);

      this.http.post<ImgurResponse>(this.uploadUrl, formData, {headers}).subscribe(result => {
        this.data.imageUrl = result.data.link;
        this.dialogRef.close(this.data);
        this.uploading = false;
      }, error => {
        this.uploading = false;
      });
    }
  }
}

interface ImgurResponse {
  data: {
    link: string;
  };
}
