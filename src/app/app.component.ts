import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public loggedIn = false;
  public isAuctioneer: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuthStatusListener().subscribe(status => {
      this.loggedIn = status;
    });
    this.authService.getPersonaListener().subscribe(persona => {
      this.isAuctioneer = persona;
    });
    this.authService.tryLogin();


  }
  
}
