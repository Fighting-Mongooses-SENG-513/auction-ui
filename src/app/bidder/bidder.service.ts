import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuctionItem } from '../models/auction-item.model';
import { Result } from '../models/result.model';
import { Search } from '../models/search.model';

@Injectable({providedIn: 'root'})
export class BidderService {

    auctionItems: AuctionItem[] = [];

    private errorListener = new Subject<string>();
    private auctionListListener = new Subject<AuctionItem[]>();

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {}


    getAuctionListListener(){
        return this.auctionListListener.asObservable();
    }

    getBidderErrorListener() {
        return this.errorListener.asObservable();
    }

    getAuctions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }

        return this.httpClient.get<Result<AuctionItem[]>>(`${environment.BASE_URL}/auctions`, httpOptions)
            .subscribe(response => {
                if(response){
                    this.auctionItems = [];
                    response.result.forEach( (auction) => {
                      let currentDate = new Date();
                      let endDate = new Date(auction.endTime);

                      let date_difference = (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

                      let item: AuctionItem = new AuctionItem(auction._id, auction.name, auction.auctioneerEmail, auction.currentBid, auction.currentHighestBidderEmail, auction.buyoutPrice,
                                date_difference, auction.imageUrl, auction.winnerEmail, auction.tags, auction.bidderEmailList);
                      this.auctionItems.push(item);
                    });
                    this.auctionListListener.next(this.auctionItems);

                }

            }, error => {
                // Failed getting auctions
                this.errorListener.next(error.error.message)

            });
    }

    searchAuctions(search: Search): Observable<Result<AuctionItem[]>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }
        return this.httpClient.post<Result<AuctionItem[]>>(`${environment.BASE_URL}/auctions/search`, search, httpOptions);
    }

    bid(auctionId, bidAmount) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }

        return this.httpClient.post<Result<AuctionItem>>(
            `${environment.BASE_URL}/auctions/${auctionId}/bid`,
            { bid: bidAmount },
            httpOptions
            ).subscribe(() => {
                this.getAuctions();
            }, error => {
                console.log('in error');
                console.log(error);
                this.errorListener.next(error.error.errors)
            });
    }

}
