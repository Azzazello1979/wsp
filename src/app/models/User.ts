export interface User {
  name: string;
  password: string;
  email?: string;
  token?: string;
  intent: string;
}
