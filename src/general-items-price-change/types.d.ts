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

interface Discount {
  id: number;
  name: string;
  percentage?: number | null;
  value?: number | null;
}

type Discounts = Map<number, Discount>;

interface CalcValue {
  value: number;
  type: 'percent' | 'amount';
}
