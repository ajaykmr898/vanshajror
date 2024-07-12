import { ApiProperty } from '@nestjs/swagger';

export class DefaultSuccessResponseDto<T> {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Request successful' })
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data?: T;
}

export class DefaultErrorResponseDto {
  @ApiProperty({ example: 'error' })
  status: string;

  @ApiProperty({ example: 'Request error' })
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: object;
}
