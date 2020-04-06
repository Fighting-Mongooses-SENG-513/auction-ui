export class AuctionItem {
    _id: String;
    name: String;
    auctioneerEmail?: String;
    currentBid: Number;
    currentHighestBidderEmail: String;
    buyoutPrice?: Number;
    auctionDays: Number;
    imageUrl: String;
    winnerEmail?: String;
    tags: Array<String>;
    bidderEmailList: Array<String>;
    endTime?: Date;

    constructor(_id: String, name: String, auctioneerEmail: String, currentBid: Number, currentHighestBidderEmail: String, buyoutPrice: Number,
              auctionDays: Number, imageUrl: String, winnerEmail: String, tags: Array<String>, bidderEmailList: Array<String>) {
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
