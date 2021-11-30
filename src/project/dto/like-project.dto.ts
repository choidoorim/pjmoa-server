import { IsNumber } from 'class-validator';

export class LikeProjectDto {
  @IsNumber()
  private readonly userIdx: number;

  @IsNumber()
  private readonly projectIdx: number;

  constructor(userIdx: number, projectIdx: number) {
    this.userIdx = userIdx;
    this.projectIdx = projectIdx;
  }

  get getUserIdx(): number {
    return this.userIdx;
  }

  get getProjectIdx(): number {
    return this.projectIdx;
  }
}
