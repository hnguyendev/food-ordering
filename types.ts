export interface Profile {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  avatar_url: string;
  website: string;
  phone: string;
  text: string;
}

export interface Item {
  id: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  soldOut: boolean;
  groupId: string;
  created_at: string;
}
