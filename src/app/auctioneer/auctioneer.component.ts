import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item';
import { AuctionDialog} from '../models/auction-dialog';
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
  public newDialog: AuctionDialog;

  constructor(private auctioneerService: AuctioneerService, public dialog: MatDialog,) {
    this.newDialog = {} as AuctionDialog;
  }

  ngOnInit() {
    this.auctioneerService.getAuctionListListener().subscribe(list => {
      this.auctionItems = list;
    });

    this.auctioneerService.getAuctions();
  }

  addItem() {
    const newItem = <AuctionItem> {
      name: this.newDialog.name,
      currentBid: 0,
      currentHighestBidderEmail: "",
      buyoutPrice: this.newDialog.buyoutPrice,
      endTime: this.newDialog.endTime,
      imageUrl: this.newDialog.imageUrl,
      tags: [],
      bidderEmailList: []
    }
    if(this.newDialog.automotive == true){
      newItem.tags.push('automotive');
    }
    if(this.newDialog.books == true){
      newItem.tags.push('books');
    }
    if(this.newDialog.clothing == true){
      newItem.tags.push('clothing');
    }
    if(this.newDialog.electronics == true){
      newItem.tags.push('electronics');
    }
    if(this.newDialog.kitchen == true){
      newItem.tags.push('kitchen');
    }
    if(this.newDialog.music == true){
      newItem.tags.push('music');
    }
    if(this.newDialog.sports == true){
      newItem.tags.push('sports');
    }
    console.log(newItem);
    this.auctioneerService.addItem(newItem);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuctioneerAddItemDialog, {
      width: '500px',
      data: {name: this.newDialog.name, buyoutPrice: this.newDialog.buyoutPrice, endTime: this.newDialog.endTime, imageUrl: this.newDialog.imageUrl,
        automotive: this.newDialog.automotive, books: this.newDialog.books, clothing: this.newDialog.clothing, electronics: this.newDialog.electronics,
        kitchen: this.newDialog.kitchen, music: this.newDialog.music, sports: this.newDialog.sports}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.newDialog = result;
        this.addItem();
      }
    });
  }

}
