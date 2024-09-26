import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * UpdateUserDto is a subclass of CreateUserDto but allows partial updates to user properties.
 * It uses PartialType from @nestjs/mapped-types to make all fields optional.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
