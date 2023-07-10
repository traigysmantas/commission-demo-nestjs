import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isBefore, startOfDay } from 'date-fns';

@ValidatorConstraint({ async: true })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(property: string, { constraints }: ValidationArguments) {
    const [beforeDate] = constraints;

    return isBefore(startOfDay(new Date(property)), new Date(beforeDate));
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property} must be before now`;
  }
}

export function IsBefore(property: Date, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsBefore',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsBeforeConstraint,
    });
  };
}
