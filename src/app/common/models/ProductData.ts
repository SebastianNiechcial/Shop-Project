export type ProductData = {
  producer: string;
  desctription: string;
  img?: [
    {
      name: string;
      result: string;
    }
  ];
  tags: string;
  price: number;
  name: string;
  userId: number;
  seller?: string;
};
