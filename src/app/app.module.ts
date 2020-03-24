import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BidderComponent } from './bidder/bidder.component';
import { AuctioneerComponent} from './auctioneer/auctioneer.component';
import { AuctioneerAddItemDialog } from './auctioneer-dialog//auctioneer-add-item-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BidderComponent,
    AuctioneerComponent,
    AuctioneerAddItemDialog,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AuctioneerAddItemDialog]

})
export class AppModule { }
