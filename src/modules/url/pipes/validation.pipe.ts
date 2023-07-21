import {
  ArgumentMetadata,
  Injectable,
  Type,
  ValidationPipe as NestJsValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe extends NestJsValidationPipe {
  constructor() {
    super();
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.canValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {
      const error = this.recurrsive(errors);
      throw new BadRequestException({
        message: error.message,
        target: error.target,
      });
    }
    return object;
  }

  private canValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private recurrsive(errors) {
    for (const err of errors) {
      if (err.children && err.children.length) {
        return this.recurrsive(err.children);
      } else {
        if (
          err.constraints &&
          err.property === 'value' &&
          err.constraints.isNotEmpty
        ) {
          return {
            message: 'Please fill all the details',
            target: err.constraints,
          };
        } else if (err.constraints && err.constraints.isNotEmpty) {
          return {
            message: `${err.property} should not be empty`,
            target: err.constraints,
          };
        } else if (err.constraints) {
          return {
            messgae: 'Invalid Data',
            target: err.constraints,
          };
        } else {
          return;
        }
      }
    }
  }
}
