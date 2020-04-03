import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
import { AuctioneerService } from '../auctioneer/auctioneer.service';
import {MatDialog} from '@angular/material/dialog';
import { AuctioneerAddItemDialogComponent } from '../auctioneer-dialog/auctioneer-add-item-dialog.component';

@Component({
  selector: 'app-auctioneer',
  templateUrl: './auctioneer.component.html',
  styleUrls: ['./auctioneer.component.scss']
})
export class AuctioneerComponent implements OnInit {

  public auctionItems: AuctionItem[] = [];

  constructor(private auctioneerService: AuctioneerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.auctioneerService.getAuctionListListener().subscribe(list => {
      this.auctionItems = list;
    });

    this.auctioneerService.getAuctions();
  }

  addItem(newItem: AuctionItem) {
    this.auctioneerService.addItem(newItem);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuctioneerAddItemDialogComponent, {
      width: '500px',
      data: {name: '', buyoutPrice: null, auctionDays: null, imageUrl: '', tags: []}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const newItem: AuctionItem = result;
        newItem.currentBid = 0;
        newItem.currentHighestBidderEmail = '';
        newItem.bidderEmailList = [];
        this.addItem(newItem);
      }
    });
  }


}
