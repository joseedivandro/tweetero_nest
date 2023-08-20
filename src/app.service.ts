import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
@Injectable()
export class AppService {
  private users: User[]; //persistencia de dados em memoria
  tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHello(): string {
    return "I'm okay!";
  }

  getHealth(): string {
    return "I'm okay!";
  }

  postUsers(user: User): void {
    this.users.push(user);
  }

  postTweets(tweet: Tweet): void {
    let checkSignUp: boolean = false;

    this.users.forEach((user) => {
      if (tweet.username === user.username) checkSignUp = true;
    });

    if (!checkSignUp)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    this.tweets.push(tweet);
  }

  getTweets(page: number) {
    const tweets = [];
    const avatarHash = {};

    this.users.forEach((user) => {
      avatarHash[user.username] = user.avatar;
    });

    for (
      let i = 15 * (isNaN(page) ? 0 : page - 1);
      i < 15 * (isNaN(page) ? 1 : page);
      i++
    ) {
      if (this.tweets[i])
        tweets.push({
          ...this.tweets[i],
          avatar: avatarHash[this.tweets[i].username],
        });
    }

    return tweets;
  }

  getUserTweets(username: string) {
    const tweets = [];
    let avatar: string;

    this.users.forEach((user) => {
      if (user.username === username) avatar = user.avatar;
    });

    this.tweets.forEach((tweet) => {
      if (tweet.username === username)
        tweets.push({
          ...tweet,
          avatar,
        });
    });
    return tweets;
  }
}
