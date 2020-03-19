


export interface AuctionItem {
    name: String;
    auctioneerEmail?: String,
    currentBid: Number;
    currentHighestBidderEmail: String;
    buyoutPrice?: Number;
    endTime: Date;
    imageUrl: String;
    winnerEmail?: String;
    tags: Array<String>;
    bidderEmailList: Array<String>;

}
