import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
import { BidderService } from '../bidder/bidder.service';
import { FormBuilder } from '@angular/forms';
import { Search } from '../models/search.model';

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss']
})
export class BidderComponent implements OnInit {

  public auctionItems: AuctionItem[] = [];

  noSearchResults = false;

  searchForm = this.formBuilder.group({
    search: ['']
  });

  constructor(private bidderService: BidderService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bidderService.getAuctionListListener().subscribe(list => {
      this.auctionItems = list;
    });

    this.bidderService.getAuctions();
  }

  onSearch() {
    this.bidderService.searchAuctions(new Search(this.searchForm.value.search)).subscribe(result => {
      if (result.result.length > 0) {
        this.noSearchResults = false;
        this.auctionItems = result.result;
      } else {
        this.noSearchResults = true;
      }
      
    })
  }
}
