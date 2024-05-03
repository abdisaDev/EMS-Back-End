export type RegisterUserParams = {
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  password: string;
};

export type createUserProfileParams = {
  session_start: string;
  session_end: string;
  session_range: string;
};
