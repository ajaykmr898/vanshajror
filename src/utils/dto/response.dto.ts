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

export function createSuccessResponse<T>(
  data: T,
  message = 'Request successful',
) {
  return {
    success: true,
    message,
    data,
  };
}

export function createErrorResponse<T>(
  error: T,
  status = 500,
  message = 'Request error',
) {
  return {
    success: false,
    status,
    message,
    error,
  };
}
