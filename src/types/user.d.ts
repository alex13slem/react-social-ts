export interface User {
  id: number;
  avatar: string;
  name: string;
  city: string;
  age: number;
  hobbies: string[];
  friends: { id: number }[];
}
