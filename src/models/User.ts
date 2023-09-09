import { IsDefined } from 'class-validator';

export class User {

  @IsDefined()
    name: string;

  @IsDefined()
    phone: string;
}