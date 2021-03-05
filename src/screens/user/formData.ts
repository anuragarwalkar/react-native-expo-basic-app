export interface FormDataItem {
  id: number;
  alise: string;
  value: string;
  title: string;
}
export interface FormData {
  [key: string]: FormDataItem;
}
export const formData: FormData = {
  title: { id: 1, value: '', alise: 'title', title: 'Title' },
  imageUrl: { id: 2, value: '', alise: 'imageUrl', title: 'Image URL' },
  price: { id: 3, value: '', title: 'Price', alise: 'price' },
  description: { id: 4, value: '', title: 'Description', alise: 'description' },
};
