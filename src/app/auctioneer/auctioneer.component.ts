import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item';
import { AuctioneerService } from '../auctioneer/auctioneer.service';

@Component({
  selector: 'app-auctioneer',
  templateUrl: './auctioneer.component.html',
  styleUrls: ['./auctioneer.component.scss']
})
export class AuctioneerComponent implements OnInit {

  public auctionItems: AuctionItem[] = [];

  constructor(private auctioneerService: AuctioneerService) {}

  ngOnInit() {
    this.auctioneerService.getAuctionListListener().subscribe(list => {
      this.auctionItems = list;
    });

    this.auctioneerService.getAuctions();
  }

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


}
