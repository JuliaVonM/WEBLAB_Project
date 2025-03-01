export interface Technology {
  _id?: string;
  name: string;
  description: string;
  category: string;
  ring?: string;
  description_ring?: string;
  published?: boolean;
  publicationDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
