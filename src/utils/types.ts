export type RegisterUserParams = {
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  password: string;
};

export enum Category {
  CAR = 'car',
  COMPUTER = 'computer',
}

export type RegisterUserItemParams = {
  id: string;
  model: string;
  color: string;
  category: Category;
};
