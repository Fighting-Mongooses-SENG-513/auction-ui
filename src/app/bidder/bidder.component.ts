import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
import { BidderService } from '../bidder/bidder.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss']
})
export class BidderComponent implements OnInit {

  public auctionItems: AuctionItem[] = [];
  filterTags: String[] = [];

  constructor(private bidderService: BidderService) {
  }

  ngOnInit() {
    this.bidderService.getAuctionListListener().subscribe(list => {
      this.auctionItems = list;
    });

    this.bidderService.getAuctions();
  }

  changeFilterTags(e): void{
   if (e.checked) {
     this.filterTags.push(e.source.value);
   } else {
     let index = this.filterTags.indexOf(e.source.value);
     if (index !== -1) {
       this.filterTags.splice(index, 1);
     }
   }
   console.log(this.filterTags);
 }
}
