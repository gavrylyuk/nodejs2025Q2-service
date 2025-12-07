import { BadRequestException, PipeTransform } from '@nestjs/common';
import { validate as isUuid } from 'uuid';

export class UuidParamPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!isUuid(value)) {
      throw new BadRequestException('Id is invalid');
    }
    return value;
  }
}
