import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss']
})
export class BidderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }

}
