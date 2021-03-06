import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuctioneerService } from './auctioneer/auctioneer.service';
import { BidderService } from './bidder/bidder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loggedIn = false;
  public isAuctioneer: boolean;
  public errorMessage: string;

  constructor(private authService: AuthService,
              private auctioneerService: AuctioneerService,
              private bidderService: BidderService) {}

  ngOnInit() {
    this.authService.getAuthStatusListener().subscribe(status => {
      this.loggedIn = status;
      if (this.loggedIn === true) {
        this.clearErrorMessage();
        if ( this.isAuctioneer ) {
          this.auctioneerService.initSocket();
        } else {
          this.bidderService.initSocket();
        }
      } else {
        this.auctioneerService.closeSocket();
        this.bidderService.closeSocket();
      }
    });
    this.authService.getPersonaListener().subscribe(persona => {
      this.isAuctioneer = persona;
    });
    this.authService.getErrorListener().subscribe(message => {
      this.errorMessage = message;
    });
    this.auctioneerService.getAuctioneerErrorListener().subscribe(message => {
      this.errorMessage = message;
    });
    this.bidderService.getBidderErrorListener().subscribe(message => {
      this.errorMessage = message;
    });
    this.authService.tryLogin();
  }

  onLogout() {
    this.authService.logout();
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
