import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item';
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
  public newItem: AuctionItem;

  constructor(private auctioneerService: AuctioneerService, public dialog: MatDialog,) {
    this.newItem = {} as AuctionItem;
  }

  ngOnInit() {
    this.auctioneerService.getAuctionListListener().subscribe(list => {
      this.auctionItems = list;
    });

    this.auctioneerService.getAuctions();
  }
/*
  addItem() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const testItem = <AuctionItem> {
      name: "My Favorite Shirt",
      currentBid: 0,
      currentHighestBidderEmail: "",
      buyoutPrice: 100,
      endTime: date,
      imageUrl: 'https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199879943/Ramen-Panda-tahiti-blue-light-t-shirt-teeturtle-full-21-1000x1000.jpg',
      tags: ['clothing'],
      bidderEmailList: []
    }
    this.auctioneerService.addItem(testItem);
  }
*/
  addItem() {
    this.newItem.currentBid = 0;
    this.newItem.currentHighestBidderEmail = "";
    this.newItem.tags = ['clothing'];
    this.newItem.bidderEmailList = [];

    this.auctioneerService.addItem(this.newItem);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuctioneerAddItemDialog, {
      width: '500px',
      data: {name: this.newItem.name, buyoutPrice: this.newItem.buyoutPrice, endTime: this.newItem.endTime, imageUrl: this.newItem.imageUrl}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItem.name = result.name;
      this.newItem.buyoutPrice = result.buyoutPrice;
      this.newItem.endTime = result.endTime;
      this.newItem.imageUrl = 'https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199879943/Ramen-Panda-tahiti-blue-light-t-shirt-teeturtle-full-21-1000x1000.jpg';
      this.addItem();
      //console.log(result);
    });
  }

}
