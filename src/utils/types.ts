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

export type ProfileUserParams = {
  gate_entry_time: Date;
  gate_exit_time: Date;
  compound_stay_time: Date;
};
