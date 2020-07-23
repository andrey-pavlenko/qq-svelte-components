interface ItemSource {
  pos: number;
  name: string;
  nights: number;
  extra_nights: number;
  checkin: string;
  initial_price: number;
  price: number;
  currency: string;
}

interface ItemCheckable extends ItemSource {
  checked: boolean;
}
