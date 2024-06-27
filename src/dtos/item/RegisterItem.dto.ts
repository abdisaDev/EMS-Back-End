import { Category } from 'src/utils/types';

export class RegisterUserItemDto {
  model: string;
  color: string;
  serial_number: string;
  category: Category;
  description: string;
}
