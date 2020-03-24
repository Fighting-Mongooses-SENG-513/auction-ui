import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
import { AuctioneerService } from '../auctioneer/auctioneer.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuctioneerAddItemDialog } from '../auctioneer-dialog/auctioneer-add-item-dialog.component';


@Component({
  selector: 'app-auctioneer',
  templateUrl: './auctioneer.component.html',
  styleUrls: ['./auctioneer.component.scss']
})
export class AuctioneerComponent implements OnInit {
  public auctionItems: AuctionItem[] = [];
  public newItem: AuctionItem = new AuctionItem();

  constructor(private auctioneerService: AuctioneerService, public dialog: MatDialog,) { }

  ngOnInit() {
    this.auctioneerService.getAuctionListListener().subscribe(list => {
      this.auctionItems = list;
    });

    this.auctioneerService.getAuctions();
  }

  addItem() {
    this.newItem.currentBid = 0;
    this.newItem.currentHighestBidderEmail = "";
    this.newItem.bidderEmailList = [];
    this.auctioneerService.addItem(this.newItem);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuctioneerAddItemDialog, {
      width: '500px',
      data: {name: this.newItem.name, buyoutPrice: this.newItem.buyoutPrice, endTime: this.newItem.endTime, imageUrl: this.newItem.imageUrl, tags: this.newItem.tags}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.newItem = result;
        this.addItem();
      }
    });
  }

}
