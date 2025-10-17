export interface TokenPayload {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  phone_number: string;
  house_number: string;
  street_name: string;
  city: string;
  state: string;
  password: string;
  created_at: string;
  updated_at: string;
};
