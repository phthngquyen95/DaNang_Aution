import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isOrganizer', async: false })
export class IsOrganizerConstraint implements ValidatorConstraintInterface {
  validate(role: any): boolean {
    return role === 'organizer';
  }

  defaultMessage(): string {
    return 'Chỉ người tổ chức (organizer) mới được phép tạo tài sản.';
  }
}
