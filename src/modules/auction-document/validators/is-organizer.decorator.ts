import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsOrganizerConstraint } from './is-organizer.validator';

export function IsOrganizer(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsOrganizerConstraint,
    });
  };
}
