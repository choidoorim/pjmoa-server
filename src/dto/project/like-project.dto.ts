import { IsNumber } from 'class-validator';

export class LikeProjectDto {
  @IsNumber()
  userIdx: number;

  @IsNumber()
  projectIdx: number;
}
