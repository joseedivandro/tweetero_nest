import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class createTweetDto {
  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  tweet: string;
}

export class createPageDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: string;
}
