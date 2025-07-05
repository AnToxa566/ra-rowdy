export interface CreateProductDto {
  slug: string;
  label: {
    en: string;
    ru: string;
    uk: string;
  };
  price: number;
  count: number;
  imageSrc: string;
}
