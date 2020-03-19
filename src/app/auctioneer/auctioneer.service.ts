import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuctionItem } from '../models/auction-item';


@Injectable({providedIn: 'root'})
export class AuctioneerService {

    auctionItems: AuctionItem[] = [];
    
    private errorListener = new Subject<string>();
    private auctionListListener = new Subject<AuctionItem[]>();

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {}


    getAuctionListListener(){
        return this.auctionListListener.asObservable();
    }

    getAuctioneerErrorListener() {
        return this.errorListener.asObservable();
    }

    addItem(item: AuctionItem){
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }
        
        return this.httpClient.post(`${environment.BASE_URL}/auctions`, item, httpOptions)
            .subscribe(response => {
                
                if(response){
                    this.getAuctions();
                }
                
            }, error => {
                // Failed getting auctions
                this.errorListener.next(error.error.message)
             
            });
        
    }

    getAuctions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }
        
        return this.httpClient.get<any>(`${environment.BASE_URL}/auctions`, httpOptions)
            .subscribe(response => {
                if(response){
                    
                    this.auctionItems = [];
                    response.result.forEach( (auction) => {
                        this.auctionItems.push(auction);
                    }); 
                    this.auctionListListener.next(this.auctionItems);

                }
                
            }, error => {
                // Failed getting auctions
                this.errorListener.next(error.error.message)
             
            });
    }



    
}

