interface Category {
  name: string;
  items: string[];
}

export type Solution = Category[];

export interface ObscuredSolution {
  id: string;
  solution: string; // base64 of a Solution
}