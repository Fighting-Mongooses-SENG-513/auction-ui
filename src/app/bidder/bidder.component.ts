import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
import { BidderService } from '../bidder/bidder.service';
import { FormBuilder } from '@angular/forms';
import { Search } from '../models/search.model';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss']
})
export class BidderComponent implements OnInit {

  private allItems: AuctionItem[] = [];

  public auctionItems: AuctionItem[] = [];
  public bidderItems: AuctionItem[] = [];
  public filterTags: string[] = [];
  public filteredItems: AuctionItem[] = [];

  noSearchResults = false;
  bidderHistory = false;
  myEmail = '';

  searchForm = this.formBuilder.group({
    search: ['']
  });

  bidForm = this.formBuilder.group({
    bidAmount: [''],
  });

  constructor(private bidderService: BidderService,
              public bidDialog: MatDialog,
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myEmail = this.authService.getUserEmail();

    this.bidderService.getAuctionListListener().subscribe(list => {
      this.allItems = list;
      this.allItems.forEach(item => {
        if (item.auctionDays >= 0) { // Display only active auctions
          this.auctionItems.push(item);
        }
        if (item.bidderEmailList.includes(this.myEmail)) {
          this.bidderItems.push(item);
        }
      });
    });

    this.bidderService.getAuctions();
  }

  toggleBidHistory() {
    this.bidderHistory = !this.bidderHistory;
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

    const filters = document.getElementsByClassName('filter');
    Array.from(filters).forEach(element => {
      const checkbox = element as HTMLInputElement;
      checkbox.checked = false;
    });
    this.bidderService.getAuctions();
  }

  changeFilterTags(e): void {
    if (e.srcElement.checked) {
      this.filterTags.push(e.srcElement.value);
    } else {
      const index = this.filterTags.indexOf(e.srcElement.value);
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

  openNav() {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav() {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
}
