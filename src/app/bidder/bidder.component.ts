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

  private allItems: AuctionItem[] = [];

  public auctionItems: AuctionItem[] = [];
  public filterTags: string[] = [];
  public filteredItems: AuctionItem[] = [];

  noSearchResults = false;
  bidderHistory = false;

  searchForm = this.formBuilder.group({
    search: ['']
  });

  constructor(private bidderService: BidderService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bidderService.getAuctionListListener().subscribe(list => {
      this.allItems = list;
      this.allItems.forEach(item => {
        if (item.auctionDays) {

        }
      })
    });

    this.bidderService.getAuctions();
  }

  showBidHistory() {
    this.bidderHistory = true;
  }

  onSearch() {
    this.bidderService.searchAuctions(new Search(this.searchForm.value.search)).subscribe(result => {
      if (result.result.length > 0) {
        this.noSearchResults = false;
        this.auctionItems = result.result;
      } else {
        this.noSearchResults = true;
        this.auctionItems = [];
      }
    });
  }



  clearSearch() {
    this.noSearchResults = false;
    this.filteredItems = [];
    this.filterTags = [];
    this.bidderService.getAuctions();
  }

  changeFilterTags(e): void {
    if (e.checked) {
      this.filterTags.push(e.source.value);
    } else {
      const index = this.filterTags.indexOf(e.source.value);
      if (index !== -1) {
        this.filterTags.splice(index, 1);
      }
    }
    this.filterItems();
  }

  filterItems() {
    this.filteredItems = [];
    if (this.filterTags.length > 0 ) {
      for (const item of this.auctionItems) {
        for (const tag of this.filterTags) {
          const index = item.tags.indexOf(tag);
          if (index !== -1) {
            this.filteredItems.push(item);
          }
        }
      }
    }
  }
}
