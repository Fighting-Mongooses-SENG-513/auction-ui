export class AuctionItem {
    name: String;
    auctioneerEmail?: String;
    currentBid: Number;
    currentHighestBidderEmail: String;
    buyoutPrice?: Number;
    endTime: Date;
    imageUrl: String;
    winnerEmail?: String;
    tags: Array<String>;
    bidderEmailList: Array<String>;

    constructor(name: String, auctioneerEmail: String, currentBid: Number, currentHighestBidderEmail: String, buyoutPrice: Number,
              endTime: Date, imageUrl: String, winnerEmail: String, tags: Array<String>, bidderEmailList: Array<String>) {
      this.name = name;
      this.auctioneerEmail = auctioneerEmail;
      this.currentBid = currentBid;
      this.currentHighestBidderEmail = currentHighestBidderEmail;
      this.buyoutPrice = buyoutPrice;
      this.endTime = endTime;
      this.imageUrl = imageUrl;
      this.winnerEmail = winnerEmail;
      this.tags = tags;
      this.bidderEmailList = bidderEmailList;
    }
}
