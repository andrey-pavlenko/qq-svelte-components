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

interface Item extends ItemSource {
  checked: boolean;
  new_price?: number;
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

type RoundMethod = 'math' | 'ceil' | 'floor';

interface CalcParams {
  sourcePrice: string;
  actionType: 'discount' | 'markup' | 'revert';
  calcValue?: CalcValue;
  round?: {
    to: number;
    method: RoundMethod;
  };
  decrease?: number;
}
