import { ApiProperty } from '@nestjs/swagger';

export class DefaultSuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Request successful' })
  message: string;

  @ApiProperty()
  data: T;
}

export class DefaultErrorResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Request successful' })
  message: string;

  @ApiProperty({ example: 'Request successful' })
  error: object;
}
