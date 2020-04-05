import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
import { BidderService } from '../bidder/bidder.service';
import { FormBuilder } from '@angular/forms';
import { Search } from '../models/search.model';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';

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

  bidForm = this.formBuilder.group({
    bidAmount: [''],
  });

  constructor(private bidderService: BidderService,
              private formBuilder: FormBuilder,
              public bidDialog: MatDialog) { }

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

  openBidDialog(auctionId) {
    const dialogRef = this.bidDialog.open(BidDialogComponent, {
      width: '500px',
      data: { bidAmount: 0.00, auctionId: auctionId }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.bidderService.bid(result.auctionId, result.bidAmount);
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
      let index = this.filterTags.indexOf(e.source.value);
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
