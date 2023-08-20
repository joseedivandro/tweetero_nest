import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createTweetDto, createPageDto } from './dtos/tweet.dto';
import { CreateUserDto } from './dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  postUsers(@Body() body: CreateUserDto): void {
    this.appService.postUsers(body);
  }

  @Post('/tweets')
  postTweets(@Body() body: createTweetDto): void {
    this.appService.postTweets(body);
  }

  @Get('/tweets')
  getTweets(@Query() page: createPageDto) {
    const pageNumber = Number(page.page);

    return this.appService.getTweets(pageNumber);
  }

  @Get('/tweets/:username')
  getUserTweets(@Param() user: { username: string }) {
    const username = user.username;

    return this.appService.getUserTweets(username);
  }
}
