export class AuctionItem {
    _id: string;
    name: string;
    auctioneerEmail?: string;
    currentBid: number;
    currentHighestBidderEmail: string;
    buyoutPrice?: number;
    auctionDays: number;
    imageUrl: string;
    winnerEmail?: string;
    tags: Array<string>;
    bidderEmailList: Array<string>;
    endTime?: Date;

    constructor(_id: string, name: string, auctioneerEmail: string, currentBid: number, currentHighestBidderEmail: string,
                buyoutPrice: number, auctionDays: number, imageUrl: string, winnerEmail: string, tags: Array<string>,
                bidderEmailList: Array<string>) {
      this._id = _id;
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
