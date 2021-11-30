import { IsDateString, IsNumber, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNumber()
  private readonly _userIdx: number;

  // 추후에 시작 날짜와 끝나는 날짜가 오늘날짜보다 작으면 안되는 validation 을 추가해야 된다.
  @IsDateString()
  private readonly _startDate: Date;

  @IsDateString()
  private readonly _endDate: Date;

  @IsString()
  private readonly _title: string;

  @IsString()
  private readonly _contents: string;

  @IsNumber()
  private readonly _maxUser: number;

  @IsString()
  private readonly _kind: string;

  @IsString()
  @Length(0, 10)
  private readonly _region: string;

  constructor(
    userIdx: number,
    startDate: Date,
    endDate: Date,
    title: string,
    contents: string,
    maxUser: number,
    kind: string,
    region: string,
  ) {
    this._userIdx = userIdx;
    this._startDate = startDate;
    this._endDate = endDate;
    this._title = title;
    this._contents = contents;
    this._maxUser = maxUser;
    this._kind = kind;
    this._region = region;
  }

  get userIdx(): number {
    return this._userIdx;
  }

  get region(): string {
    return this._region;
  }
}
