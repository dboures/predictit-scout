export interface User {
  _id: string;
  twitterHandle: string;
  createdAt: string;
  roles: string[];
  isAdmin: boolean;
}
