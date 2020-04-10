import { Component, OnInit } from '@angular/core';
import { AuctionItem } from '../models/auction-item.model';
import { BidderService } from '../bidder/bidder.service';
import { FormBuilder } from '@angular/forms';
import { Search } from '../models/search.model';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import {AuthService} from '../auth/auth.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss']
})
export class BidderComponent implements OnInit {
  public auctionItems: AuctionItem[] = [];
  public bidderItems: AuctionItem[] = [];
  public filterTags: string[] = [];
  public displayedItems: AuctionItem[] = [];

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
      this.auctionItems = list;
      this.filterItems();
    });

    this.bidderService.getAuctions();
  }

  toggleBidHistory() {
    this.bidderHistory = !this.bidderHistory;
  }

  onSearch() {
    if (this.searchForm.value.search === '') {
      return;
    } else {
      this.bidderService.searchAuctions(new Search(this.searchForm.value.search)).subscribe(result => {
        if (result.result.length > 0) {
          this.noSearchResults = false;
          this.auctionItems = result.result;
          this.filterItems();
        } else {
          this.noSearchResults = true;
          this.auctionItems = [];
          this.displayedItems = [];
        }
      });
    }

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
    this.displayedItems = [];
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
    this.displayedItems = cloneDeep(this.auctionItems);
    this.bidderItems = cloneDeep(this.auctionItems);
    this.filterDisplayedItems();
    this.filterBidderItems();
  }

  openNav() {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav() {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  private filterDisplayedItems() {
    this.displayedItems = this.displayedItems.filter((item) => {
      // Don't include anything that's expired or has been won buy buyout
      if (item.auctionDays <= 0 || typeof item.winnerEmail !== 'undefined') {
        return false;
      }

      // If filters are applied, check that at least one applies to the item
      if (this.filterTags.length > 0) {
        const result = this.filterTags.some((tag) => {
          return item.tags.includes(tag);
        });
        return result
      } else {
        return true;
      }
    });
  }

  private filterBidderItems() {
    this.bidderItems = this.bidderItems.filter((item) => {
      return item.bidderEmailList.includes(this.myEmail);
    });
  }
}
