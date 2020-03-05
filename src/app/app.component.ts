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
  public errorMessage: string;

  constructor(private authService: AuthService) {}

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
    this.authService.tryLogin();
  }

  onLogout() {
    this.authService.logout();
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
  
}
