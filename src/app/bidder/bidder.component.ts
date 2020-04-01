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
  public filterTags: String[] = [];
  public filteredItems: AuctionItem[] = [];

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
        this.auctionItems = [];
      }

    });
  }

  clearSearch() {
    this.noSearchResults = false;
    this.filteredItems = [];
    this.filterTags = [];
    let filters = document.getElementsByClassName("filter");
    for(let filter of filters){
      filter.checked = false;
    }
    this.bidderService.getAuctions();
  }

  changeFilterTags(e): void {
    if (e.srcElement.checked) {
      this.filterTags.push(e.srcElement.value);
    } else {
      let index = this.filterTags.indexOf(e.srcElement.value);
      if (index !== -1) {
        this.filterTags.splice(index, 1);
      }
    }
    this.filterItems();
  }

  filterItems() {
    this.filteredItems = [];
    if(this.filterTags.length > 0 ){
      for(let item of this.auctionItems) {
        for(let tag of this.filterTags) {
          let index = item.tags.indexOf(tag);
          if (index !== -1) {
            this.filteredItems.push(item);
          }
        }
      }
    }
  }
}
