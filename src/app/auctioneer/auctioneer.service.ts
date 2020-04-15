import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuctionItem } from '../models/auction-item.model';
import { Result } from '../models/result.model';
import * as io from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class AuctioneerService {

    auctionItems: AuctionItem[] = [];
    private socket: any;
    private errorListener = new Subject<string>();
    private auctionListListener = new Subject<AuctionItem[]>();

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {}

    public initSocket() {
        const _service = this;
        this.socket = io(`${environment.BASE_URL}`);

        this.socket.on('update', () => {
            _service.getAuctions();
        });
    }

    public closeSocket() {
        if (this.socket && this.socket.connected) {
            this.socket.close();
        }
    }

    getAuctionListListener() {
        return this.auctionListListener.asObservable();
    }

    getAuctioneerErrorListener() {
        return this.errorListener.asObservable();
    }

    addItem(item: AuctionItem) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken()
            })
        };

        return this.httpClient.post(`${environment.BASE_URL}/auctions`, item, httpOptions)
            .subscribe(response => {
                // successfully added item
            }, error => {
                // Failed getting auctions
                this.errorListener.next(error.error.message);

            });

    }

    getAuctions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authService.getToken()
            })
        };

        return this.httpClient.get<Result<AuctionItem[]>>(`${environment.BASE_URL}/auctions`, httpOptions)
            .subscribe(response => {
                if (response) {
                    this.auctionItems = [];
                    response.result.forEach( (auction) => {
                      const currentDate = new Date();
                      const endDate = new Date(auction.endTime);

                      const dateDifference = (endDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

                      const item: AuctionItem = new AuctionItem(auction._id, auction.name, auction.auctioneerEmail, auction.currentBid,
                        auction.currentHighestBidderEmail, auction.buyoutPrice, dateDifference, auction.imageUrl, auction.winnerEmail,
                        auction.tags, auction.bidderEmailList);
                      this.auctionItems.push(item);
                    });
                    this.auctionListListener.next(this.auctionItems);
                }

            }, error => {
                // Failed getting auctions
                this.errorListener.next(error.error.message);

            });
    }




}
