import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BidderComponent } from './bidder/bidder.component';
import { AuctioneerComponent } from './auctioneer/auctioneer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BidDialogComponent } from './bid-dialog/bid-dialog.component';
import {AuctioneerAddItemDialogComponent} from './auctioneer-dialog/auctioneer-add-item-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BidderComponent,
    AuctioneerComponent,
    BidDialogComponent,
    AuctioneerAddItemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AuctioneerAddItemDialogComponent, BidDialogComponent]
})
export class AppModule { }
