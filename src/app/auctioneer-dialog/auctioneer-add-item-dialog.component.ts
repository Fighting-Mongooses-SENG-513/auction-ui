import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject} from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

export interface AuctioneerAddItemDialogData {
  itemName: string;
  minimumBid: number;
  startTime: string;
  endTime: string;
  image: string;
}

@Component({
  selector: 'auctioneer-add-item-dialog',
  templateUrl: './auctioneer-add-item-dialog.component.html',
  styleUrls: ['./auctioneer-add-item-dialog.component.scss']
})
export class AuctioneerAddItemDialog {
  public min: Date;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AuctioneerAddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AuctioneerAddItemDialogData) {
      this.min = new Date();

    }

  onNoClick(): void {
    this.dialogRef.close();
  }


  fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
  }

  preview() {
      // Show preview
      var mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
      }
  }

}
