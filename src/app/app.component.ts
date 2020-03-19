import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuctioneerService } from './auctioneer/auctioneer.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuctioneerAddItemDialog } from './auctioneer-dialog/auctioneer-add-item-dialog.component';

export interface AuctioneerAddItemDialogData {
  itemName: string;
  minimumBid: number;
  startTime: number;
  endTime: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public loggedIn = false;
  public isAuctioneer: boolean;
  public errorMessage: string;

 // auctioneer add item information
 itemName: string;
 minimumBid: number;
 startTime: number;
 endTime: number;


  constructor(private authService: AuthService, public dialog: MatDialog, private auctioneerService: AuctioneerService) {}

  ngOnInit() {
    this.authService.getAuthStatusListener().subscribe(status => {
      this.loggedIn = status;
      if (this.loggedIn === true) {
        this.clearErrorMessage();
      }
    });
    this.authService.getPersonaListener().subscribe(persona => {
      this.isAuctioneer = persona;
    });
    this.authService.getErrorListener().subscribe(message => {
      this.errorMessage = message;
    })
    this.auctioneerService.getAuctioneerErrorListener().subscribe(message => {
      this.errorMessage = message;
    })
    this.authService.tryLogin();
  }

  onLogout() {
    this.authService.logout();
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuctioneerAddItemDialog, {
      width: '500px',
      data: {itemName: this.itemName, minimumBid: this.minimumBid, startTime: this.startTime, endTime: this.endTime}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      //this.animal = result;
    });
  }

}
