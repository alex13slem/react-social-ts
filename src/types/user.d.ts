export interface User {
  id: string;
  avatar: string;
  name: string;
  city: string;
  age: number;
  hobbies: string[];
  friends: { id: number }[];
}
