import { IsDateString, IsNumber, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNumber()
  private readonly userIdx: number;

  // 추후에 시작 날짜와 끝나는 날짜가 오늘날짜보다 작으면 안되는 validation 을 추가해야 된다.
  @IsDateString()
  private readonly startDate: Date;

  @IsDateString()
  private readonly endDate: Date;

  @IsString()
  private readonly title: string;

  @IsString()
  private readonly contents: string;

  @IsNumber()
  private readonly maxUser: number;

  @IsString()
  private readonly kind: string;

  @IsString()
  @Length(0, 10)
  private readonly region: string;

  constructor(userIdx: number, region: string) {
    this.userIdx = userIdx;
    this.region = region;
  }

  get getUserIdx(): number {
    return this.userIdx;
  }

  get getRegion(): string {
    return this.region;
  }
}
