export class Tweet {
  username: string;
  tweet: string;

  constructor(username: string, tweet: string) {
    this.username = username;
    this.tweet = tweet;
  }
}

export class Page {
  page: string;

  constructor(page: string) {
    this.page = page;
  }
}
