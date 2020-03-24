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

    contructor(name: String, auctioneerEmail: String, buyoutPrice: Number, endTime: Date, imageUrl: String, tags: Array<String>) {
      this.name = name;
      this.auctioneerEmail = auctioneerEmail;
      this.currentBid = 0;
      this.currentHighestBidderEmail = "";
      this.buyoutPrice = buyoutPrice;
      this.endTime = endTime;
      this.imageUrl = imageUrl;
      this.winnerEmail = "";
      this.tags = tags;
      this.bidderEmailList = [];
    }
}
