export class AuctionItem {
    name: string;
    auctioneerEmail?: string;
    currentBid: number;
    currentHighestBidderEmail: string;
    imageUrl: string;
    tags: Array<string>;
    bidderEmailList: Array<string>;
    winnerEmail?: string;
    buyoutPrice?: number;
    auctionDays?: number;
    endTime?: Date;

    constructor(name: string, auctioneerEmail: string, currentBid: number, currentHighestBidderEmail: string, imageUrl: string,
                tags: Array<string>, winnerEmail?: string, bidderEmailList?: Array<string>, buyoutPrice?: number, auctionDays?: number) {
      this.name = name;
      this.auctioneerEmail = auctioneerEmail;
      this.currentBid = currentBid;
      this.currentHighestBidderEmail = currentHighestBidderEmail;
      this.buyoutPrice = buyoutPrice;
      this.auctionDays = auctionDays;
      this.imageUrl = imageUrl;
      this.winnerEmail = winnerEmail;
      this.tags = tags;
      this.bidderEmailList = bidderEmailList;
    }
}
