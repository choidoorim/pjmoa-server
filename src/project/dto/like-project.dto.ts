import { IsNumber } from 'class-validator';

export class LikeProjectDto {
  @IsNumber()
  private readonly _userIdx: number;

  @IsNumber()
  private readonly _projectIdx: number;

  constructor(userIdx: number, projectIdx: number) {
    this._userIdx = userIdx;
    this._projectIdx = projectIdx;
  }

  get userIdx(): number {
    return this._userIdx;
  }

  get projectIdx(): number {
    return this._projectIdx;
  }
}
