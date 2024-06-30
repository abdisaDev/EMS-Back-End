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
  model: string;
  color: string;
  serial_number: string;
  category: Category;
  description: string;
};

export type ProfileUserParams = {
  gate_entry_time: Date;
  gate_exit_time: Date;
  compound_stay_time: Date;
};

export type SignInParams = {
  phone_number: string;
  password: string;
};

export type GetOtpParams = {
  phone_number: string;
};

export type VerifyOtpParams = {
  otp: string;
};
