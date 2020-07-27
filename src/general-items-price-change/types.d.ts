interface ItemSource {
  readonly pos: number;
  readonly name: string;
  readonly nights: number;
  readonly extra_nights: number;
  readonly checkin: string;
  readonly initial_price: number;
  readonly price: number;
  readonly currency: string;
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

type RoundMethods = 'round' | 'ceil' | 'floor';

type PriceKeys = 'initial_price' | 'price';

type ActionVariants = 'discount' | 'markup' | 'revert';

interface CalcParams {
  action: ActionVariants;
  priceKey: PriceKeys;
  calcValue?: CalcValue;
  round?: {
    to: number;
    method: RoundMethods;
  };
  decrease?: number;
}
