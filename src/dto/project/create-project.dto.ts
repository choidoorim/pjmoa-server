import {
  IsDateString,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateProjectDto {
  @IsNumber()
  userIdx: number;

  // 추후에 시작 날짜와 끝나는 날짜가 오늘날짜보다 작으면 안되는 validation 을 추가해야 된다.
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsNumber()
  maxUser: number;

  @IsString()
  kind: string;

  @IsString()
  @Length(0, 10)
  region: string;
}
