import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @Type(() => Number)
  private readonly pageNo: number | 1;

  @IsInt()
  @Type(() => Number)
  private readonly pageSize: number | 10;

  getSkip(): number {
    return (this.pageNo - 1) * this.pageSize;
  }

  getTake(): number {
    return this.pageSize;
  }
}
